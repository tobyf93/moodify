import $ from 'jquery';

export const ADD_PLAYLISTS = 'ADD_PLAYLISTS';
export const ADD_TRACKS = 'ADD_TRACKS';
export const TOGGLE_PLAYLIST = 'TOGGLE_PLAYLIST';

export function fetchPlaylists() {
  return dispatch => {
    $.get('/playlists', playlists => {
      dispatch({ type: ADD_PLAYLISTS, playlists: JSON.parse(playlists) });
    });
  }
}

export function togglePlaylist(id) {
  return { type: TOGGLE_PLAYLIST, id };
}
