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
    @data = []
    user = RSpotify::User.new(session[:omniauth])

    # playlists is the object returned from RSpotify
    # playlists_req is what is returned from client (with selected field)
    playlists = user.playlists
    playlists_req = params[:playlists]

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
            sleep 2
            next
          end

          if response.empty?
            energy = 'Unknown'
            valence = 'Unknown'
          else
            energy = response[0][:audio_summary][:energy]
            valence = response[0][:audio_summary][:valence]
          end

          @data.push({
            :title => title,
            :artist => artist,
            :energy => energy,
            :valence => valence
          })

          puts track_idx
          track_idx += 1
        end
      end
    end
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
end
