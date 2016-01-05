class PagesController < ApplicationController
  def index
    gon.playlists = []

    if request.env['omniauth.auth'].present?
      user = RSpotify::User.new(request.env['omniauth.auth'])
      # Now you can access user's private data, create playlists and much more

      playlists = user.playlists
      my_playlists = get_my_playlists user.id, playlists
      gon.playlists = my_playlists

      response = HTTParty.get('http://developer.echonest.com/api/v4/song/search?api_key=PWBP6ZPNBM8WFOEFT&format=json&artist=michael%20jackson&title=beat%20it&bucket=audio_summary')
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
