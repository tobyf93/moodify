var SpotifyWebApi = require('spotify-web-api-node')
    request = require('request-promise'),
    getMood = require('./moods');

function SpotifyConnector(config) {
  var config = config || {};

  this.authCode     = config.code;
  this.accessToken  = config.accessToken;
  this.refreshToken = config.refreshToken;
  this.userID       = config.userID;
  this.scopes       = config.scopes;

  // TODO: clietSecret needs to go into ENV variable
  this.api = new SpotifyWebApi({
    redirectUri : 'http://localhost:3000/callback',
    clientId : '75ae9a46e92b4925a74619d8eb8e1556',
    clientSecret : '2c556c74e45347b09bbda2879a0b7a63'
  });

  if (this.accessToken) {
    this.api.setAccessToken(this.accessToken);
  }
}

SpotifyConnector.prototype.createAuthorizeURL = function() {
  return this.api.createAuthorizeURL(this.scopes);
};

SpotifyConnector.prototype.authenticate = function() {
  var that = this;

  return new Promise(function(resolve, reject) {
    if (!that.authCode) {
      reject(new Error("No auth code provided"));
    }

    var accessToken, refreshToken, userID, expiresIn;
    that.api.authorizationCodeGrant(that.authCode)
      .then(function(data) {
        accessToken = data.body['access_token'];
        refreshToken = data.body['refresh_token'];
        expiresIn = data.body['expires_in'];

        // Spotify returns expires_in in seconds.  We need it in milliseconds
        // for res.cookie()
        expiresIn = parseInt(expiresIn) * 1000;

        that.api.setAccessToken(accessToken);
        return that.api.getMe();
      })
      .then(function(data) {
        userID = data.body.id;
        resolve({
          accessToken: accessToken,
          refreshToken: refreshToken,
          userID: userID,
          expiresIn: expiresIn
        });
      })
      .catch(function(err) {
        reject(new Error(err));
      });
  });
};

SpotifyConnector.prototype.getUserPlaylists = function() {
  var that = this;

  function map(data) {
    var playlists = data.body.items;

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

  return new Promise(function(resolve, reject) {
    that.api.getUserPlaylists(that.userID)
      .then(function(data) {
        resolve(map(data));
      },
      function(err) {
        reject(new Error(err));
      })
  });
};

// TODO: Increase limit
SpotifyConnector.prototype.getPlaylistTracks = function(playlistID) {
  const that = this;
  var tracks = [];

  const findTrack = (id) => {
    for (var i in tracks) {
      var track = tracks[i];
      if (track.id === id) {
        return track;
      }
    }

    return undefined;
  }

  return this.api.getPlaylistTracks(this.userID, playlistID)
    .then((data) => {
      const playlistItems = data.body.items;

      playlistItems.forEach((playlistItem) => {
        tracks.push({
          id: playlistItem.track.id,
          name: playlistItem.track.name,
          artists: playlistItem.track.artists.map((artist) => artist.name).join(', ')
        });
      });
    })
    .then(that.getAudioFeatures.bind(that, tracks, findTrack));
};

SpotifyConnector.prototype.getAudioFeatures = function(tracks, findTrack) {
  const that = this;
  const allTrackIDs = tracks.map((track) => track.id);
  const audioFeatureBatchSize = 20;
  var promises = [];

  const options = {
    uri: 'https://api.spotify.com/v1/audio-features',
    qs: {
      ids: undefined
    },
    headers: {
      Authorization: 'Bearer ' + that.accessToken
    },
    json: true
  };

  // Getting audio features in batches is limited by the max length of a URL,
  // something like 2000.  We have to request these tracks in batches.
  for (var i = 0; i < tracks.length; i += audioFeatureBatchSize) {
    var trackIDs =    allTrackIDs
                      .slice(i, i + audioFeatureBatchSize)
                      .join(',');

    options.qs.ids = trackIDs;
    promises.push(request(options));
  }

  return Promise.all(promises)
    .then((data) => {
      var result = [];
      data.forEach((dataItem) => {
        dataItem.audio_features.forEach((audioFeatureTrack) => {
          result.push(audioFeatureTrack);
        });
      });

      return result;
    })
    .then((audioFeatures) => {
      audioFeatures.forEach((audioFeature) => {
        if (!audioFeature) {
          return;
        }

        var track = findTrack(audioFeature.id);
        if (!track) {
          return;
        } else {
          var valence = audioFeature.valence;
          var energy = audioFeature.energy;

          track.valence = valence;
          track.energy = energy;
          track.mood = getMood(valence, energy);
        }
      });
    })
    .then(() => {
      return tracks;
    });

    // TODO: re-implement catch
    // .catch((error) => {
    //   console.log(error);
    //   throw new Error('Playlist tracks not found');
    // });
}

module.exports = SpotifyConnector;
