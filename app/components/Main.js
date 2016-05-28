// TODO: Find a way of including this in index.html
require('../assets/stylesheets/main.scss');

import React from 'react';
import Header from './Header';
import List from './List';

export default function Main(props) {
  return (
    <div>
      <Header
        fetchPlaylists={props.actions.fetchPlaylists}
        userDetails={props.userDetails}
      />
      <List
        selectPlaylist={props.actions.selectPlaylist}
        playlists={props.playlists}
      />

    </div>
  );
}
