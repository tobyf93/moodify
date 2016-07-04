import { ADD_PLAYLISTS, TOGGLE_PLAYLIST, ADD_TRACKS } from '../actions/playlists';

// TODO: fix up all these args, they can get confusing...
export default function playlists(state = [], action) {
  switch (action.type) {
    case ADD_PLAYLISTS:
      return [...action.playlists];
    case TOGGLE_PLAYLIST:
      return togglePlaylist(state, action);
    case ADD_TRACKS:
      return addTracks(state, action);
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

const addTracks = (state, action) => {
  return state.reduce((previous, current) => {
    let playlistID = current.id;
    let tracks = action.playlists[playlistID];

    return [
      ...previous,
      {
        ...current,
        tracks
      }
    ];
  }, []);
}
