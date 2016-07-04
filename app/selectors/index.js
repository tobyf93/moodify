import { createSelector } from 'reselect';

export const derivedStates = {
  LOGIN: 'LOGIN',
  FETCH: 'FETCH',
  ANALYSE: 'ANALYSE',
  MOODS: 'MOODS'
};

const getLoginStatus = (state) => state.userDetails.loggedIn;
const getPlaylists = (state) => state.playlists;
const getMoodKeys = (state) => Object.keys(state.moods);

export const getDerivedState = createSelector(
  [getLoginStatus, getPlaylists, getMoodKeys],
  (loggedIn, playlists, moodKeys) => {
    if (moodKeys.length) {
      return derivedStates.MOODS;
    } else if (!loggedIn) {
      return derivedStates.LOGIN;
    } else if (!playlists.length) {
      return derivedStates.FETCH;
    } else {
      return derivedStates.ANALYSE;
    }
  }
);
