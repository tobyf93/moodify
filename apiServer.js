var express = require('express'),
    serveStatic = require('serve-static'),
    SpotifyWebApi = require('spotify-web-api-node'),
    cookieParser = require('cookie-parser'),
    spotifyConnector = require('./lib/spotifyConnector');

module.exports = function(PORT) {
  var app = express();

  // Middleware
  app.use(cookieParser())
     .use(serveStatic(__dirname + '/dist'));



  app.get('/login', function(req, res) {
    var spotifyApi = spotifyConnector();
    var scopes = ['user-read-private', 'user-read-email'];
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authorizeURL);
  });

  // Use authCode to retreive accessToken.  Store token in cookie for use in
  // API calls.
  app.get('/callback', function(req, res) {
    var authCode = req.query.code;

    spotifyConnector()
      .authenticate(authCode)
      .then(function(data) {
        res.cookie('accessToken', data.accessToken);
        res.cookie('refreshToken', data.refreshToken);
        res.cookie('userID', data.userID);
        res.redirect('/');
      },
      function(err) {
        res.redirect('/#invalid_auth_code');
      });
  });

  app.get('/playlists', function(req, res) {
    var spotifyApi = spotifyConnector(req.cookies);

    spotifyApi.getUserPlaylists()
      .then(function(data) {
        console.log('Retrieved playlists', data.body);
      },function(err) {
        console.log('Something went wrong!', err);
      });
  });

  app.listen(PORT);
}
