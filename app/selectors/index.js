import { createSelector } from 'reselect';

export const derivedStates = {
  LOGIN: 'LOGIN',
  FETCH: 'FETCH',
  ANALYSE: 'ANALYSE'
};

const getLoginStatus = (state) => state.userDetails.loggedIn;
const getPlaylists = (state) => state.playlists;

export const getDerivedState = createSelector(
  [getLoginStatus, getPlaylists],
  (loggedIn, playlists) => {
    if (!loggedIn) {
      return derivedStates.LOGIN;
    } else if (!playlists.length) {
      return derivedStates.FETCH;
    } else {
      return derivedStates.ANALYSE;
    }
  }
);
