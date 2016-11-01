var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    SpotifyConnector = require('./lib/SpotifyConnector'),
    co = require('co');

module.exports = (PORT) => {
  var app = express();

  // Middleware
  app.use(cookieParser())
     .use(bodyParser.json())
     .use(express.static('dist'));

  app.get('/login', (req, res) => {
    var redirectUri = req.protocol + '://' + req.hostname + '/callback';
    redirectUri = redirectUri.replace('localhost', 'localhost:3000');

    var config = {
      scopes: ['user-read-private', 'user-read-email'],
      redirectUri: redirectUri
    };

    var spotifyConnector = new SpotifyConnector(config);
    var authorizeURL = spotifyConnector.createAuthorizeURL();
    res.redirect(authorizeURL);
  });

  app.get('/callback', (req, res) => {
    var redirectUri = req.protocol + '://' + req.hostname + '/callback';
    redirectUri = redirectUri.replace('localhost', 'localhost:3000');
    const config = req.query;
    config.redirectUri = redirectUri;
    var spotifyConnector = new SpotifyConnector(config);

    spotifyConnector
      .authenticate()
      .then((data) => {
        const expires = new Date(Date.now() + data.expiresIn);
        res.cookie('accessToken', data.accessToken, { expires });
        res.cookie('refreshToken', data.refreshToken, { expires });
        res.cookie('userID', data.userID, { expires });
        res.redirect('/#fetch');
      })
      .catch((error) => {
        console.log(error);
        res.redirect('/#invalid_auth_code');
      });
  });

  app.get('/playlists', (req, res) => {
    const config = req.cookies;
    var spotifyConnector = new SpotifyConnector(config);

    spotifyConnector
      .getUserPlaylists()
      .then((playlists) => {
        res.send(JSON.stringify(playlists));
      })
      .catch((error) => {
        res.send(error);
      })
  });

  // TODO: Only doing first playlist
  app.post('/moods', (req, res) => {
    const playlistIDs = req.body;
    const playlistID = playlistIDs[0];
    const config = req.cookies;
    var spotifyConnector = new SpotifyConnector(config);

    // co(function* () {
    //   playlistIDs.forEach((playlistID) => {
    //     let tracks = yield spotifyConnector.getPlaylistTracks(playlistID);
    //     console.log('tracks', tracks);
    //   });
    // });

    spotifyConnector
      .getPlaylistTracks(playlistID)
      .then((tracks) => {
        // TODO: Quick hack
        var playlists = {};
        playlists[playlistID] = tracks;

        res.send(JSON.stringify(playlists));
      })
      .catch((error) => {
        res.send(error);
      });
  });

  app.listen(PORT);
}
