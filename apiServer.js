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
      function(err) {
        res.send(err);
      });
  });

  app.post('/moods', (req, res) => {
    const playlists = req.body;
    const config = req.cookies;
    var spotifyConnector = new SpotifyConnector(config);
    spotifyConnector.getPlaylistTracks(playlists[0])
      .then((data) => {
        // playlistItem is a wrapper around track
        const playlistItems = data.body.items;
        playlistItems.forEach((playlistItem) => {
          const track = playlistItem.track;
          const name = track.name;
          const artists = track.artists.map((artist) => artist.name).join(', ');
          console.log(name, 'by', artists);
        })

        res.send(data.body.items[0].track);
      })
      .catch((err) => {
        console.log(err);
      })
  });

  app.listen(PORT);
}
