var express = require('express'),
    serveStatic = require('serve-static'),
    SpotifyWebApi = require('spotify-web-api-node'),
    cookieParser = require('cookie-parser');

module.exports = function(PORT) {
  var app = express();
  var spotifyCredentials = {
    redirectUri : 'http://localhost:3000/callback',
    clientId : '75ae9a46e92b4925a74619d8eb8e1556',
    clientSecret : '2c556c74e45347b09bbda2879a0b7a63',
  };

  // Middleware
  app.use(cookieParser())
     .use(serveStatic(__dirname + '/dist'));



  app.get('/login', function(req, res) {
    var spotifyApi = new SpotifyWebApi(spotifyCredentials);
    var scopes = ['user-read-private', 'user-read-email'];
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authorizeURL);
  });

  // Use authCode to retreive accessToken.  Store token in cookie for use in
  // API calls.
  app.get('/callback', function(req, res, next) {
    var spotifyApi = new SpotifyWebApi(spotifyCredentials);
    var authCode = req.query.code;

    if (authCode) {
      spotifyApi.authorizationCodeGrant(authCode)
        .then(function(data) {
          var accessToken = data.body['access_token'];
          var refreshToken = data.body['refresh_token'];

          // Store tokens for future requests
          res.cookie('accessToken', accessToken);
          res.cookie('refreshToken', refreshToken);

          spotifyApi.setAccessToken(accessToken);
          res.redirect('/');
        })
        .catch(function(err) {
          console.log('ERROR', err.message);
          res.redirect('/');
        });
    } else {
      res.redirect('/#invalid_auth_code');
    }
  });

  app.get('/playlists', function() {
    var spotifyApi = new SpotifyWebApi(spotifyCredentials);

    spotifyApi.getMe()
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.log('ERROR', err.message);
      });
  });

  app.listen(PORT);
}
