import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigButton from '../components/BigButton';
import * as actions from '../redux/actions/playlists';
import { bindActionCreators } from 'redux';

class Fetch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BigButton
        text="Fetch Playlists"
        onClick={this.props.fetchPlaylists}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(Fetch);
