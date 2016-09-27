const Spotify = require('spotify-web-api-js'),
      cookie = require('cookie'),
      co = require('co'),
      getMood = require('./moods');

function SpotifyConnector() {
  const parsedCookie = cookie.parse(document.cookie);
  const spotify = new Spotify();
  spotify.setAccessToken(parsedCookie.accessToken);

  this.api = spotify;
  this.userID = parsedCookie.userID;
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

SpotifyConnector.prototype.getPlaylistTracks = function(userID, playlistID) {

}

SpotifyConnector.prototype.getMoods = function(playlistIDs) {
  const that = this;

  return co(function*() {
    let tracks = {};

    // Get tracks
    for (let i in playlistIDs) {
      let playlistID = playlistIDs[i];
      const playlist = yield that.api.getPlaylistTracks(that.userID, playlistID);

      console.log('tracks', playlist.items.length);
      // Save all tracks from playlist, indexed by ID for quicker access later
      playlist.items.forEach((playlistItem) => {
        tracks[playlistItem.track.id] = {
          playlistID,
          name: playlistItem.track.name,
          artists: playlistItem.track.artists.map((artist) => artist.name).join(', ')
        }
      });
    }

    // Get audio features and add valence and energy to each track.  Create moods
    // object with tracks.
    let moods = {};
    const trackIDs = Object.keys(tracks);
    const audioFeatures = (yield that.api.getAudioFeaturesForTracks(trackIDs)).audio_features;
    audioFeatures.forEach((audioFeature) => {
      let track = tracks[audioFeature.id];
      let valence = audioFeature.valence;
      let energy = audioFeature.energy;
      let mood = getMood(valence, energy);

      moods[mood] = moods[mood] || [];
      moods[mood].push(track);
    });

    return moods;
  });
}

export default SpotifyConnector;
