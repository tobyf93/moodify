var express = require('express'),
    serveStatic = require('serve-static'),
    SpotifyWebApi = require('spotify-web-api-node');

module.exports = function(PORT) {
  var app = express();
  var spotifyApi = new SpotifyWebApi({
    redirectUri : 'http://localhost:3000',
    clientId : '75ae9a46e92b4925a74619d8eb8e1556',
    clientSecret : '2c556c74e45347b09bbda2879a0b7a63',
  });

  app.use(serveStatic(__dirname + '/dist'));

  // Set cookie with playlist info
  app.get('/test', function(req, res, next) {
    var authCode = req.query.code;

    // Fetch user information
    if (authCode) {
      spotifyApi.authorizationCodeGrant(authCode)
        .then(function(data) {
          console.log('Retrieved access token', data.body['access_token']);

          // Set the access token
          spotifyApi.setAccessToken(data.body['access_token']);

          // Use the access token to retrieve information about the user connected to it
          return spotifyApi.getMe();
        })
        .then(function(data) {
          // "Retrieved data for Faruk Sahin"
          console.log('Retrieved data for ' + data.body['display_name']);

          // "Email is farukemresahin@gmail.com"
          console.log('Email is ' + data.body.email);

          // "Image URL is http://media.giphy.com/media/Aab07O5PYOmQ/giphy.gif"
          console.log('Image URL is ' + data.body.images[0].url);

          // "This user has a premium account"
          console.log('This user has a ' + data.body.product + ' account');
        })
        .catch(function(err) {
          console.log('Something went wrong', err.message);
        });
    }

    next();
  });

  app.get('/login', function(req, res) {
    var scopes = ['user-read-private', 'user-read-email'];

    var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authorizeURL);
  });

  app.listen(PORT);
}
