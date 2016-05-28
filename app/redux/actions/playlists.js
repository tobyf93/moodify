import $ from 'jquery';

export const ADD_PLAYLISTS = 'ADD_PLAYLISTS';
export const SELECT_PLAYLIST = 'SELECT_PLAYLIST';

export function fetchPlaylists() {
  return dispatch => {
    $.get('/playlists', function(playlists) {
      dispatch({ type: ADD_PLAYLISTS, playlists: JSON.parse(playlists) });
    });
  }
}

export function selectPlaylist(id) {
  return { type: SELECT_PLAYLIST, id };
}
