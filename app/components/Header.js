import React, { PropTypes } from 'react';

const Header = ({ fetchPlaylists, analysePlaylists, userDetails, playlists }) => {
  function login() {
    window.location = '/login';
  }

  const selectedPlaylists = playlists.filter(playlist => {
    return playlist.selected;
  });

  // TODO: Create a property in the state tree to use in a switch statement
  let button = {};
  if (!userDetails.loggedIn) {
    button.text = 'Login';
    button.action = login;
  } else if (!playlists.length) {
    button.text = 'Fetch Playlists';
    button.action = fetchPlaylists;
  } else {
    button.text = 'Analyse ' + selectedPlaylists.length + ' Playlists';
    button.action = () => {
      analysePlaylists(selectedPlaylists);
    }
  }

  return (
    <div id="header">
      <h1>Moodify</h1>
      <i className="fa fa-spotify logo" aria-hidden="true"></i>
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
