class PagesController < ApplicationController
  def index
    gon.playlists = []

    if request.env['omniauth.auth'].present?
      session[:omniauth] = request.env['omniauth.auth']
      user = RSpotify::User.new(request.env['omniauth.auth'])

      playlists = user.playlists
      gon.playlists = playlists
    end
  end

  def analyze
    user = RSpotify::User.new(session[:omniauth])
    @playlists = user.playlists

    track = @playlists[0].tracks[0]
    name = track.name.gsub(/\s/, '+')
    artist = track.artists[0].name.gsub(/\s/, '+')

    song = Echonest::Song.new('PWBP6ZPNBM8WFOEFT')
    params = {
      :title => name,
      :artist => artist,
      :bucket => 'audio_summary'
    }
    song.search(params)

    raise 'hello'
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
