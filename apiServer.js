var express = require('express'),
    serveStatic = require('serve-static'),
    SpotifyWebApi = require('spotify-web-api-node'),
    cookieParser = require('cookie-parser'),
    SpotifyConnector = require('./lib/SpotifyConnector');

module.exports = function(PORT) {
  var app = express();

  // Middleware
  app.use(cookieParser())
     .use(serveStatic(__dirname + '/dist'));



  app.get('/login', function(req, res) {
    var config = {
      scopes: ['user-read-private', 'user-read-email']
    };

    var spotifyConnector = new SpotifyConnector(config);
    var authorizeURL = spotifyConnector.createAuthorizeURL();
    res.redirect(authorizeURL);
  });

  app.get('/callback', function(req, res) {
    var spotifyConnector = new SpotifyConnector(req.query);

    spotifyConnector
      .authenticate()
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
    var spotifyConnector = new SpotifyConnector(req.cookies);

    // TODO: Need to handle refreshing tokens or wiping userDetails
    // from state to re-prompt user for login.
    spotifyConnector
      .getUserPlaylists()
      .then(function(playlists) {
        res.send(JSON.stringify(playlists));
      },
      function(err) {
        res.send(err);
      });
  });

  app.listen(PORT);
}
