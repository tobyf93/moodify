var SpotifyWebApi = require('spotify-web-api-node')
    request = require('request-promise');

function SpotifyConnector(config) {
  var config = config || {};
  var redirectUri = config.redirectUri || 'http://mood-ify.herokuapp.com/callback';

  this.authCode     = config.code;
  this.accessToken  = config.accessToken;
  this.refreshToken = config.refreshToken;
  this.userID       = config.userID;
  this.scopes       = config.scopes;

  this.api = new SpotifyWebApi({
    redirectUri : redirectUri,
    clientId : '75ae9a46e92b4925a74619d8eb8e1556',
    clientSecret : process.env.CLIENT_SECRET
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

    var accessToken, refreshToken, userID, expiresIn;
    that.api.authorizationCodeGrant(that.authCode)
      .then(function(data) {
        accessToken = data.body['access_token'];
        refreshToken = data.body['refresh_token'];
        expiresIn = data.body['expires_in'];

        // Spotify returns expires_in in seconds.  We need it in milliseconds
        // for res.cookie()
        expiresIn = parseInt(expiresIn) * 1000;

        that.api.setAccessToken(accessToken);
        return that.api.getMe();
      })
      .then(function(data) {
        userID = data.body.id;
        resolve({
          accessToken: accessToken,
          refreshToken: refreshToken,
          userID: userID,
          expiresIn: expiresIn
        });
      })
      .catch(function(err) {
        reject(new Error(err));
      });
  });
};

module.exports = SpotifyConnector;
