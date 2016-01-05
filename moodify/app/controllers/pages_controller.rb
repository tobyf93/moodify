class PagesController < ApplicationController
  def index
    gon.playlists = []

    if request.env['omniauth.auth'].present?
      session[:omniauth] = request.env['omniauth.auth']
      user = RSpotify::User.new(request.env['omniauth.auth'])

      playlists = user.playlists
      # my_playlists = get_my_playlists user.id, playlists
      gon.playlists = my_playlists

      response = HTTParty.get('http://developer.echonest.com/api/v4/song/search?api_key=PWBP6ZPNBM8WFOEFT&format=json&artist=michael%20jackson&title=beat%20it&bucket=audio_summary')
    end
  end

  def analyze
    user = RSpotify::User.new(session[:omniauth])
    @playlists = user.playlists
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
