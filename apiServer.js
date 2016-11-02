var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    SpotifyConnector = require('./lib/SpotifyConnector'),
    co = require('co');

const getRedirectUri = (req) => {
  var redirectUri = req.protocol + '://' + req.hostname + '/callback';
  redirectUri = redirectUri.replace('localhost', 'localhost:3000');
  return redirectUri;
}

module.exports = (PORT) => {
  var app = express();

  // Middleware
  app.use(cookieParser())
     .use(bodyParser.json())
     .use(express.static('dist'));

  app.get('/login', (req, res) => {
    var redirectUri = getRedirectUri(req);

    var config = {
      scopes: ['user-read-private', 'user-read-email'],
      redirectUri: redirectUri
    };

    var spotifyConnector = new SpotifyConnector(config);
    var authorizeURL = spotifyConnector.createAuthorizeURL();
    res.redirect(authorizeURL);
  });

  app.get('/callback', (req, res) => {
    var redirectUri = getRedirectUri(req);
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

  app.listen(PORT);
}
