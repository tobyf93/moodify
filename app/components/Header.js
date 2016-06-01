import React, { PropTypes } from 'react';

// TODO: Can this be done in webpack config?
const spotifyLogo = require("file!../assets/images/spotify.png");

const Header = ({ fetchPlaylists, userDetails, playlists }) => {
  function login() {
    window.location = '/login';
  }

  const selectedPlaylists = playlists.filter(playlist => {
    return playlist.selected;
  }).length;

  // TODO: Create a property in the state tree to use in a switch statement
  let button = {};
  if (!userDetails.loggedIn) {
    button.text = 'Login';
    button.action = login;
  } else if (!playlists.length) {
    button.text = 'Fetch Playlists';
    button.action = fetchPlaylists;
  } else {
    button.text = 'Analyse ' + selectedPlaylists + ' Playlists';
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
