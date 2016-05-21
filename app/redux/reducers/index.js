import { combineReducers } from 'redux';
import { userDetails } from './userDetails'
import { playlists } from './playlists';

export default combineReducers({
  userDetails,
  playlists
});
