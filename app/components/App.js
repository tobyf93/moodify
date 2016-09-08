// TODO: Find a way of including this in index.html
require('../assets/stylesheets/main.scss');

import React, { Component } from 'react';
import Header from '../components/Header';
import PlaylistList from '../components/PlaylistList';
import { derivedStates } from '../selectors';
import MoodList from '../components/MoodList';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  getList() {
    let list = [];

    if (this.props.derivedState === derivedStates.ANALYSE) {
      list = (
        <PlaylistList
          togglePlaylist={this.props.actions.togglePlaylist}
          playlists={this.props.playlists}
        />
      );
    } else if (this.props.derivedState === derivedStates.MOODS) {
      list = (
        <MoodList tracksByMood={this.props.moods} />
      );
    }

    return list;
  }

  render() {
    return (
      <div>
        <Header
          derivedState={this.props.derivedState}
          fetchPlaylists={this.props.actions.fetchPlaylists}
          analysePlaylists={this.props.actions.analysePlaylists}
          userDetails={this.props.userDetails}
          playlists={this.props.playlists}
        />
        {this.getList()}
        {this.props.children}
      </div>
    );
  }
}

export default Main;
