var SpotifyWebApi = require('spotify-web-api-node');

module.exports = spotifyConnector;

function spotifyConnector(cookies) {
  var cookies = cookies || {};
  var api = new SpotifyWebApi({
    redirectUri : 'http://localhost:3000/callback',
    clientId : '75ae9a46e92b4925a74619d8eb8e1556',
    clientSecret : '2c556c74e45347b09bbda2879a0b7a63',
  });

  api.authenticate = function(authCode) {
    return new Promise(function(resolve, reject) {
      if (!authCode) {
        reject(new Error("No auth code provided"));
      }

      var accessToken, refreshToken, userID;
      api.authorizationCodeGrant(authCode)
        .then(function(data) {
          accessToken = data.body['access_token'];
          refreshToken = data.body['refresh_token'];

          api.setAccessToken(accessToken);
          return api.getMe();
        })
        .then(function(data) {
          userID = data.body.id;
          resolve({
            accessToken: accessToken,
            refreshToken: refreshToken,
            userID: userID
          });
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  if (cookies.token) {
    api.setAccessToken(token);
  }

  return api;
}
