import { FETCH_PLAYLIST } from '../actions/playlists';

export function playlists(state = [], action) {
  switch (action.type) {
    case FETCH_PLAYLIST:
      return { ...state, name: action.name };
      break;
    default:
      return state;
  }
}
