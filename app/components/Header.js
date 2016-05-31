import React, { PropTypes } from 'react';

// TODO: Can this be done in webpack config?
const spotifyLogo = require("file!../assets/images/spotify.png");

const Header = ({ fetchPlaylists, userDetails, playlists }) => {
  function login() {
    window.location = '/login';
  }

  function onClick() {
    if (!userDetails.loggedIn) {
      login();
    } else if (!playlists.length) {
      fetchPlaylists();
    } else {
      // analysePlaylists();
    }
  }

  function buttonText() {
    if (!userDetails.loggedIn) {
      return 'Login';
    } else if (!playlists.length) {
      return 'Fetch Playlists';
    } else {
      return 'Analyse ' + playlists.length + ' Playlists';
    }
  }

  return (
    <div id="header">
      <h1>Moodify</h1>
      <img src={spotifyLogo} />
      <div  id="button"
            onClick={onClick}>
        {buttonText()}
      </div>
    </div>
  );
}

Header.propTypes = {
  fetchPlaylists: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired
};

export default Header;
