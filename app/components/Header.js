import React, { PropTypes } from 'react';

// TODO: Can this be done in webpack config?
const spotifyLogo = require("file!../assets/images/spotify.png");

const Header = ({ fetchPlaylists, userDetails, playlists }) => {
  function login() {
    window.location = '/login';
  }

  let button = {};
  if (!userDetails.loggedIn) {
    button.text = 'Login';
    button.action = login;
  } else if (!playlists.length) {
    button.text = 'Fetch Playlists';
    button.action = fetchPlaylists;
  } else {
    button.text = 'Analyse Playlists';
    // button.action = analysePlaylists;
  }

  return (
    <div id="header">
      <h1>Moodify</h1>
      <img src={spotifyLogo} />
      <div  id="button"
            onClick={button.action}>
        {button.text}
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
