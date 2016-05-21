import { ADD_PLAYLISTS } from '../actions/playlists';

export function playlists(state = [], action) {
  switch (action.type) {
    case ADD_PLAYLISTS:
      return [...action.playlists];
      break;
    default:
      return state;
  }
}
