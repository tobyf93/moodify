class PagesController < ApplicationController
  def index

    if request.env['omniauth.auth'].present?
      user = RSpotify::User.new(request.env['omniauth.auth'])
      # Now you can access user's private data, create playlists and much more

      playlists = user.playlists
      @my_playlists = get_my_playlists user.id, playlists
      # @tracks = playlists.first.tracks

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
