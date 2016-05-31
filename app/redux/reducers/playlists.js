import { ADD_PLAYLISTS, TOGGLE_PLAYLIST } from '../actions/playlists';

export function playlists(playlists = [], action) {
  switch (action.type) {
    case ADD_PLAYLISTS:
      return [...action.playlists];
      break;
    case TOGGLE_PLAYLIST:
      return selectPlaylist(playlists, action.id);
      break;
    default:
      return playlists;
  }
}

const selectPlaylist = (prevPlaylists, id) => {
  let playlists = [...prevPlaylists];

  for (let i = 0; i < playlists.length; i++) {
    let playlist = playlists[i];

    if (playlist.id === id) {
      playlist.selected = !playlist.selected;
      break;
    }
  }

  return playlists;
}
