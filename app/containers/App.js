import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../redux/actions/playlists';

import Main from '../components/Main';

// TODO: This is bad shit
const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(playlistActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
