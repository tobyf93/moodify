import $ from 'jquery';
import { ADD_TRACKS } from './playlists';

export const ADD_MOODS = 'ADD_MOODS';

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
        dispatch({ type: ADD_TRACKS, moods: JSON.parse(data.tracks) });
        dispatch({ type: ADD_MOODS, moods: JSON.parse(data.moods) });
      }
    });
  }
}
