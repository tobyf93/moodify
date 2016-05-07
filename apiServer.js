var express = require('express');
var serveStatic = require('serve-static');
var SpotifyWebApi = require('spotify-web-api-node');

module.exports = function(PORT) {
  var app = express();

  app.use(serveStatic(__dirname + '/src'));

  app.get('/login', function (req, res) {
    var scopes = ['user-read-private', 'user-read-email'],
    redirectUri = req.protocol + '://' + req.get('host'),
    clientId = '75ae9a46e92b4925a74619d8eb8e1556';
    // state = 'some-state-of-my-choice';

    // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
    var spotifyApi = new SpotifyWebApi({
      redirectUri : redirectUri,
      clientId : clientId
    });

    // Create the authorization URL
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.send(req.protocol + '://' + req.get('host'));
    res.redirect(authorizeURL);
  });

  app.listen(PORT);
}
