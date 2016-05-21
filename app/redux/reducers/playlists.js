import { FETCH_PLAYLISTS } from '../actions/playlists';

export function playlists(state = [], action) {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      return { ...state, name: action.name };
      break;
    default:
      return state;
  }
}
