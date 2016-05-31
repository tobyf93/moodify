import { ADD_PLAYLISTS, TOGGLE_PLAYLIST } from '../actions/playlists';

export function playlists(state = [], action) {
  switch (action.type) {
    case ADD_PLAYLISTS:
      return [...action.playlists];
    case TOGGLE_PLAYLIST:
      return togglePlaylist(state, action);
    default:
      return state;
  }
}

const togglePlaylist = (state, action) => {
  const id = action.id;
  let playlists = [...state];

  for (let i in playlists) {
    let playlist = playlists[i];

    if (playlist.id === id) {
      playlist.selected = !playlist.selected;
      break;
    }
  }

  return playlists;
}
