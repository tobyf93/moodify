require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, '75ae9a46e92b4925a74619d8eb8e1556', '2c556c74e45347b09bbda2879a0b7a63', scope: 'playlist-read-private playlist-modify-public user-library-read'
end
