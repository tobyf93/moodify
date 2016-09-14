import React, { Component, PropTypes } from 'react';
import { derivedStates } from '../selectors';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  login() {
    window.location = '/login';
  }

  getButton() {
    let button = {};
    let selectedPlaylists = this.props.playlists.filter(playlist => {
      return playlist.selected;
    });

    switch (this.props.derivedState) {
      case derivedStates.LOGIN:
        button.text = 'Login';
        button.action = this.login;
        break;
      case derivedStates.FETCH:
        button.text = 'Fetch Playlists';
        button.action = this.props.fetchPlaylists;
        break;
      case derivedStates.ANALYSE:
        button.text = 'Analyse ' + selectedPlaylists.length + ' Playlists';
        button.action = () => {
          this.props.analysePlaylists(selectedPlaylists);
        }
        break;
      case derivedStates.MOODS:
        button.text = 'Back To Playlists';
        break;
    }

    return (
      <div  id="button"
            onClick={button.action}>
        {button.text}
      </div>
    );
  }
  
// {this.getButton()}
  render() {
    return (
      <div id="header">
        <div id="brandName">Moodify</div>
        <i className="fa fa-spotify logo" aria-hidden="true"></i>
      </div>
    );
  }
}

// Header.propTypes = {
//   derivedState: PropTypes.string.isRequired,
//   fetchPlaylists: PropTypes.func.isRequired,
//   userDetails: PropTypes.object.isRequired,
//   playlists: PropTypes.array.isRequired
// };

export default Header;
