import { combineReducers } from 'redux';
import userDetails from './userDetails'
import playlists from './playlists';
import moods from './moods';

export default combineReducers({
  userDetails,
  playlists,
  moods
});
