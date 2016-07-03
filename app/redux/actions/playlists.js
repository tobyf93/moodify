import $ from 'jquery';
import { ADD_MOODS } from './moods';
import SpotifyConnector from '../../lib/SpotifyConnector';

export const ADD_PLAYLISTS = 'ADD_PLAYLISTS';
export const ADD_TRACKS = 'ADD_TRACKS';
export const TOGGLE_PLAYLIST = 'TOGGLE_PLAYLIST';

export function fetchPlaylists() {
  return dispatch => {
    const spotifyConnector = new SpotifyConnector();

    spotifyConnector.getUserPlaylists().then((playlists) => {
      dispatch({ type: ADD_PLAYLISTS, playlists });
    });
  }
}

export function togglePlaylist(id) {
  return { type: TOGGLE_PLAYLIST, id };
}

export function analysePlaylists(playlists) {
  const spotifyConnector = new SpotifyConnector();
  const playlistIDs = playlists.map((playlist) => {
    return playlist.id;
  });

  return dispatch => {
    spotifyConnector.getMoods(playlistIDs);
  }
}
