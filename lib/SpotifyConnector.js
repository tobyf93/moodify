var SpotifyWebApi = require('spotify-web-api-node');

module.exports = SpotifyConnector;

function SpotifyConnector(config) {
  var config = config || {};

  this.authCode     = config.code;
  this.accessToken  = config.accessToken;
  this.refreshToken = config.refreshToken;
  this.userID       = config.userID;
  this.scopes       = config.scopes;

  this.api = new SpotifyWebApi({
    redirectUri : 'http://localhost:3000/callback',
    clientId : '75ae9a46e92b4925a74619d8eb8e1556',
    clientSecret : '2c556c74e45347b09bbda2879a0b7a63'
  });

  if (this.accessToken) {
    this.api.setAccessToken(this.accessToken);
  }
}

SpotifyConnector.prototype.createAuthorizeURL = function() {
  return this.api.createAuthorizeURL(this.scopes);
};

SpotifyConnector.prototype.authenticate = function() {
  var that = this;

  return new Promise(function(resolve, reject) {
    if (!that.authCode) {
      reject(new Error("No auth code provided"));
    }

    var accessToken, refreshToken, userID;
    that.api.authorizationCodeGrant(that.authCode)
      .then(function(data) {
        accessToken = data.body['access_token'];
        refreshToken = data.body['refresh_token'];

        that.api.setAccessToken(accessToken);
        return that.api.getMe();
      })
      .then(function(data) {
        console.log(data);
        userID = data.body.id;
        resolve({
          accessToken: accessToken,
          refreshToken: refreshToken,
          userID: userID
        });
      })
      .catch(function(err) {
        reject(new Error(err));
      });
  });
};

SpotifyConnector.prototype.getUserPlaylists = function() {
  var that = this;

  function map(data) {
    var playlists = data.body.items;

    return playlists.map(function(playlist) {
      return {
        thumbnail: playlist.images[0],
        name: playlist.name,
        trackCount: playlist.tracks.total
      }
    });
  }

  return new Promise(function(resolve, reject) {
    that.api.getUserPlaylists(that.userID)
      .then(function(data) {
        resolve(map(data));
      },
      function(err) {
        reject(new Error(err));
      })
  });
};
