const Spotify = require('spotify-web-api-js'),
      cookie = require('cookie');

function SpotifyConnector() {
  const parsedCookie = cookie.parse(document.cookie);
  const spotify = new Spotify();
  spotify.setAccessToken(parsedCookie.accessToken);
  this.api = spotify;
}

SpotifyConnector.prototype.getUserPlaylists = function() {
  let map = (data) => {
    var playlists = data.items;

    return playlists.map(function(playlist) {
      return {
        id: playlist.id,
        selected: false,
        thumbnail: playlist.images[0],
        name: playlist.name,
        trackCount: playlist.tracks.total
      }
    });
  }

  let promiseImp = (resolve, reject) => {
    this.api.getUserPlaylists().then((data) => {
      resolve(map(data));
    });
  }

  return new Promise(promiseImp);
}

// SpotifyConnector.prototype.getUserPlaylists = function() {
//   var that = this;
//

//
//   return new Promise(function(resolve, reject) {
//     that.api.getUserPlaylists(that.userID)
//       .then(function(data) {
//         resolve(map(data));
//       },
//       function(err) {
//         reject(new Error(err));
//       })
//   });
// };

export default SpotifyConnector;
