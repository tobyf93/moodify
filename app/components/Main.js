// TODO: Find a way of including this in index.html
require('../assets/stylesheets/main.scss');

import React from 'react';
import Header from './Header';
import PlaylistList from './PlaylistList';
import { derivedStates } from '../selectors';
import MoodList from './MoodList';

const Main = (props) => {
  let list = [];

  if (props.derivedState === derivedStates.ANALYSE) {
    list = (
      <PlaylistList
        togglePlaylist={props.actions.togglePlaylist}
        playlists={props.playlists}
      />
    );
  } else if (props.derivedState === derivedStates.MOODS) {
    list = (
      <MoodList tracksByMood={props.moods} />
    );
  }

  return (
    <div>
      <Header
        derivedState={props.derivedState}
        fetchPlaylists={props.actions.fetchPlaylists}
        analysePlaylists={props.actions.analysePlaylists}
        userDetails={props.userDetails}
        playlists={props.playlists}
      />
      {list}
    </div>
  );
}

export default Main;
