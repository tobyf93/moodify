import $ from 'jquery';
import { ADD_MOODS } from './moods';

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

export function analysePlaylists(playlists) {
  const playlistIDs = playlists.map((playlist) => {
    return playlist.id;
  });

  return dispatch => {
    $.ajax({
      type: "POST",
      url: '/moods',
      data: JSON.stringify(playlistIDs),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        dispatch({ type: ADD_TRACKS, playlists: data });
        // dispatch({ type: ADD_MOODS, moods: JSON.parse(data.moods) });
      }
    });
  }
}
