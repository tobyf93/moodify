import $ from 'jquery';

export const ADD_PLAYLISTS = 'ADD_PLAYLISTS';

export function fetchPlaylists() {
  return dispatch => {
    $.get('/playlists', function(playlists) {
      dispatch({ type: ADD_PLAYLISTS, playlists: JSON.parse(playlists) });
    });
  }
}
