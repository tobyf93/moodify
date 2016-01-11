require 'pry'

class PagesController < ApplicationController
  def index
    gon.playlists = []

    if request.env['omniauth.auth'].present?
      session[:omniauth] = request.env['omniauth.auth']
      user = RSpotify::User.new(request.env['omniauth.auth'])

      gon.playlists = user.playlists.map do |playlist|
        {
          :name => playlist.name,
          :total => playlist.total
        }
      end
    end
  end

  def analyze
    data = {}
    user = RSpotify::User.new(session[:omniauth])

    # playlists is the object returned from RSpotify
    # playlists_req is what is returned from client (with selected field)
    playlists = user.playlists
    playlists_req = params[:_json]

    Thread.new do
      playlists_req.each_with_index do |playlist_req, playlist_idx|
        if playlist_req[:selected] == true
          track_idx = 0
          puts playlists[playlist_idx].tracks.length
          while track_idx < playlists[playlist_idx].tracks.length do
            # Needs to be moved
            song = Echonest::Song.new('PWBP6ZPNBM8WFOEFT')

            track = playlists[playlist_idx].tracks[track_idx]
            title = track.name
            artist = track.artists[0].name
            url_name = track.name.gsub(/\s/, '+')
            url_artist = track.artists[0].name.gsub(/\s/, '+')

            params = {
              :title => title,
              :artist => artist,
              :bucket => 'audio_summary'
            }

            begin
              response = song.search(params)
            rescue Echonest::Error
              # sleep 2
              next
            end

            mood = 'Unknown'
            if response.present?
              energy = response[0][:audio_summary][:energy]
              valence = response[0][:audio_summary][:valence]
              mood = get_mood(valence, energy)
            end

            data[mood] = data[mood] || []
            data[mood].push({
              :title => title,
              :artist => artist
            })

            rec = Request.find_by :ip_address => request.env["HTTP_HOST"]
            if rec.nil?
              rec = Request.create :ip_address => request.env["HTTP_HOST"]
            end
            rec.update :data => YAML.dump(data)

            if track_idx == playlists[playlist_idx].tracks.length - 1
              rec.update :done => true
            end

            puts track_idx
            track_idx += 1
            session[:progress] += 1
          end
        end
      end
    end

    render json: {}
  end

  def get_my_playlists user_id, playlists
    my_playlists = []

    playlists.map do |playlist|
      if playlist.owner.id == user_id
        my_playlists.push playlist
      end
    end

    my_playlists
  end

  def get_mood valence, energy
    moods = {
      :excited => {
        :valence => 0.691,
        :energy => 0.962
      },
      :happy => {
        :valence => 0.962,
        :energy => 0.691
      },
      :chilled => {
        :valence => 0.962,
        :energy => 0.309
      },
      :peaceful => {
        :valence => 0.591,
        :energy => 0.038
      },
      :bored => {
        :valence => 0.309,
        :energy => 0.038
      },
      :depressed => {
        :valence => 0.038,
        :energy => 0.309
      },
      :stressed => {
        :valence => 0.038,
        :energy => 0.691
      },
      :aggressive => {
        :valence => 0.309,
        :energy => 0.962
      }
    }

    if energy == 'Unknown' || valence == 'Unknown'
      return 'Unknown'
    end

    shortest_distance = 999
    mood = 'Unknown'
    moods.each do |key, hash|
      valence2 = hash[:valence]
      energy2 = hash[:energy]

      inner_equation = (valence2 - valence)**2 + (energy2 - energy)**2

      distance = Math.sqrt inner_equation
      if distance < shortest_distance
        shortest_distance = distance
        mood = key.to_s
      end
    end

    mood
  end

  def status
    data = {}
    rec = Request.find_by :ip_address => request.env["HTTP_HOST"]
    if rec.present?
      data = YAML.load rec.data
      rec.destroy
    end

    render json: data
  end
end
