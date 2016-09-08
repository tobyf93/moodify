var express = require('express'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    SpotifyConnector = require('./lib/SpotifyConnector');

module.exports = (PORT, PROD) => {
  var app = express();

  // Middleware
  app.use(cookieParser())
     .use(bodyParser.json());
    //  .use(serveStatic(__dirname + '/dist'));

  app.get('/login', (req, res) => {
    var config = {
      scopes: ['user-read-private', 'user-read-email']
    };

    var spotifyConnector = new SpotifyConnector(config);
    var authorizeURL = spotifyConnector.createAuthorizeURL();
    res.redirect(authorizeURL);
  });

  app.get('/callback', (req, res) => {
    const config = req.query;
    var spotifyConnector = new SpotifyConnector(config);

    spotifyConnector
      .authenticate()
      .then((data) => {
        const expires = new Date(Date.now() + data.expiresIn);
        res.cookie('accessToken', data.accessToken, { expires });
        res.cookie('refreshToken', data.refreshToken, { expires });
        res.cookie('userID', data.userID, { expires });
        res.redirect('/');
      })
      .catch((error) => {
        res.redirect('/#invalid_auth_code');
      });
  });

  app.get('/playlists', (req, res) => {
    const config = req.cookies;
    var spotifyConnector = new SpotifyConnector(config);

    // TODO: Need to handle refreshing tokens or wiping userDetails
    // from state to re-prompt user for login.
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

  // Allows all other traffic to hit index.html and be handled by react-router
  app.get('*', (req, res) => {
    if (PROD) {
      res.sendFile(__dirname + '/dist/index.html');
    } else {
      res.sendFile(__dirname + '/app/index.html');
    }
  });

  app.listen(PORT);
}
