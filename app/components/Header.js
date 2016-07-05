import React, { PropTypes } from 'react';
import { derivedStates } from '../selectors';

const Header = ({ derivedState, fetchPlaylists, analysePlaylists, userDetails, playlists }) => {
  function login() {
    window.location = '/login';
  }

  const selectedPlaylists = playlists.filter(playlist => {
    return playlist.selected;
  });

  let button = {};
  switch (derivedState) {
    case derivedStates.LOGIN:
      button.text = 'Login';
      button.action = login;
      break;
    case derivedStates.FETCH:
      button.text = 'Fetch Playlists';
      button.action = fetchPlaylists;
      break;
    case derivedStates.ANALYSE:
      button.text = 'Analyse ' + selectedPlaylists.length + ' Playlists';
      button.action = () => {
        analysePlaylists(selectedPlaylists);
      }
      break;
    case derivedStates.MOODS:
      button.text = 'great success';
      break;
  }

  return (
    <div id="header">
      <div id="brandName">Moodify</div>
      <i className="fa fa-spotify logo" aria-hidden="true"></i>
      <div  id="button"
            onClick={button.action}>
        {button.text}
      </div>
    </div>
  );
}

Header.propTypes = {
  derivedState: PropTypes.string.isRequired,
  fetchPlaylists: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired
};

export default Header;
