var express = require('express'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    SpotifyConnector = require('./lib/SpotifyConnector');

module.exports = function(PORT) {
  var app = express();

  // Middleware
  app.use(cookieParser())
     .use(bodyParser.json())
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
    const config = req.query;
    var spotifyConnector = new SpotifyConnector(config);

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
    const config = req.cookies;
    var spotifyConnector = new SpotifyConnector(config);

    // TODO: Need to handle refreshing tokens or wiping userDetails
    // from state to re-prompt user for login.
    spotifyConnector
      .getUserPlaylists()
      .then(function(playlists) {
        res.send(JSON.stringify(playlists));
      },
      function(error) {
        res.send(error);
      });
  });

  // TODO: Only doing first playlist
  app.post('/moods', (req, res) => {
    const playlistIDs = req.body;
    const playlistID = playlistIDs[0];
    const config = req.cookies;
    var spotifyConnector = new SpotifyConnector(config);

    spotifyConnector
      .getPlaylistTracks(playlistID)
      .then((tracks) => {
        res.send(JSON.stringify([
          {
            id: playlistID,
            tracks: tracks
          }
        ]));
      })
      .catch((error) => {
        res.send(error);
      });
  });

  app.listen(PORT);
}
