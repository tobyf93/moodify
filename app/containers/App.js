import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../redux/actions/playlists';
import * as moodActions from '../redux/actions/moods';
import { getDerivedState } from '../selectors';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    ...state,
    derivedState: getDerivedState(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...playlistActions, ...moodActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
