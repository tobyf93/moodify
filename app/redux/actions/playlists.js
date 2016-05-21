export const FETCH_PLAYLIST = 'FETCH_PLAYLIST';

export function fetchPlaylist() {
  return dispatch => {
    dispatch({ type: FETCH_PLAYLIST });
  }
}
