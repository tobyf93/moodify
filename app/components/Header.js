import React, { PropTypes } from 'react';

// TODO: Can this be done in webpack config?
let spotifyLogo = require("file!../assets/images/spotify.png");

const Header = ({ fetchPlaylists, userDetails }) => {
  const LOGIN = 'LOGIN',
        FETCH = 'FETCH',
        ANALYSE = 'ANALYSE';

  function buttonState() {
    if (userDetails.loggedIn) {
      return FETCH;
    } else {
      return LOGIN;
    }
  }

  function onClick() {
    if (buttonState() === LOGIN) {
      login();
    } else {
      fetchPlaylists();
    }
  }

  function login() {
    window.location = '/login';
  }

  let buttonText = (buttonState() === LOGIN ? 'Login' : 'Fetch Playlists');

  return (
    <div id="header">
      <h1>Moodify</h1>
      <img src={spotifyLogo} />
      <div  id="button"
            onClick={onClick}>
        {buttonText}
      </div>
    </div>
  );
}

Header.propTypes = {
  fetchPlaylists: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
};

export default Header;
