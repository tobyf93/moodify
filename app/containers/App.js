import { Component } from 'react';
import { connect } from 'react-redux';

import Main from '../components/Main';
import { changeName } from '../redux/actions/hello';

function mapStateToProps(state) {
  // Playlists
  //   Songs
  // Moods
  //   Songs
  //   Reference to what playlist its from

  return {
    playlists: null,
    moods: null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNameChange: (e) => dispatch(changeName(e.target.value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
