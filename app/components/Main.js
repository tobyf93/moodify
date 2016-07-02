// TODO: Find a way of including this in index.html
require('../assets/stylesheets/main.scss');

import React from 'react';
import Header from './Header';
import List from './List';

const Main = (props) => {
  return (
    <div>
      <Header
        derivedState={props.derivedState}
        fetchPlaylists={props.actions.fetchPlaylists}
        analysePlaylists={props.actions.analysePlaylists}
        userDetails={props.userDetails}
        playlists={props.playlists}
      />
      <List
        togglePlaylist={props.actions.togglePlaylist}
        playlists={props.playlists}
      />
    </div>
  );
}

export default Main;
