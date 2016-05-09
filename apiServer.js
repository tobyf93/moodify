var express = require('express'),
    serveStatic = require('serve-static'),
    SpotifyWebApi = require('spotify-web-api-node'),
    cookieParser = require('cookie-parser');

module.exports = function(PORT) {
  var app = express();
  var spotifyApi = new SpotifyWebApi({
    redirectUri : 'http://localhost:3000',
    clientId : '75ae9a46e92b4925a74619d8eb8e1556',
    clientSecret : '2c556c74e45347b09bbda2879a0b7a63',
  });

  // Use authCode to retreive accessToken.  Store token in cookie for use in
  // API calls.
  // TODO: Probably need better logic in place to determine whether or not
  // to run through this middleware func.
  app.get('/', function(req, res, next) {
    var authCode = req.query.code;

    if (authCode) {
      spotifyApi.authorizationCodeGrant(authCode)
        .then(function(data) {
          var accessToken = data.body['access_token'];

          res.cookie('accessToken', accessToken);
          spotifyApi.setAccessToken(accessToken);
          return spotifyApi.getMe();
        })
        .then(function(data) {
          var userID = data.body.id;
          res.cookie('id', userID);
          next();
          // return spotifyApi.getUserPlaylists(userID);
        })
        // .then(function(data) {
        //   console.dir(data.body.items[0]);
        //   next();
        // })
        .catch(function(err) {
          console.log('ERROR', err.message);
          next();
        });
    } else {
      next();
    }
  });

  app.use(cookieParser());
  app.use(serveStatic(__dirname + '/dist'));

  app.get('/login', function(req, res) {
    var scopes = ['user-read-private', 'user-read-email'];

    var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authorizeURL);
  });

  app.listen(PORT);
}
