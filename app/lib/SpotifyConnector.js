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
        trackCount: playlist.tracks.total,
        owner: playlist.owner.id
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

SpotifyConnector.prototype.getMoods = function(playlists) {
  const that = this;

  return co(function*() {
    let tracks = {};

    // Get tracks
    for (let i in playlists) {
      let ownerID = playlists[i].owner;
      let playlistID = playlists[i].id;

      // Get tracks in batches
      let playlist = [];
      for (let offset = 0;; offset += 100) {
        const batch = yield that.api.getPlaylistTracks(ownerID, playlistID, { offset: offset });
        playlist = [...playlist, ...batch.items];

        if (!batch.next) {
          break;
        }
      }

      // Save all tracks from playlist, indexed by ID for quicker access later
      playlist.forEach((playlistItem) => {
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
    const batchSize = 100;
    for (let offset = 0;; offset += batchSize) {
      const batchTrackIDs = trackIDs.slice(offset, offset + batchSize);

      if (!batchTrackIDs.length) {
        break;
      }

      const audioFeatures = (yield that.api.getAudioFeaturesForTracks(batchTrackIDs)).audio_features;
      audioFeatures.forEach((audioFeature) => {
        if (!audioFeature) {
          return;
        }

        let track = tracks[audioFeature.id];
        let valence = audioFeature.valence;
        let energy = audioFeature.energy;
        let mood = getMood(valence, energy);

        moods[mood] = moods[mood] || [];
        moods[mood].push(track);
      });
    }

    return moods;
  });
}

export default SpotifyConnector;
