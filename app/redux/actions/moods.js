import $ from 'jquery';
import { ADD_TRACKS } from './playlists';

export const ADD_MOODS = 'ADD_MOODS';

export function analysePlaylists(playlists) {
  return dispatch => {
    $.post('/moods', JSON.stringify(playlists), data => {
      dispatch({ type: ADD_TRACKS, moods: JSON.parse(data.tracks) });
      dispatch({ type: ADD_MOODS, moods: JSON.parse(data.moods) });
    });
  }
}
