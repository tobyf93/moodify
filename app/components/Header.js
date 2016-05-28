import React from 'react';

// TODO: Can this be done in webpack config?
let spotifyLogo = require("file!../assets/images/spotify.png");

export default function Header(props) {
  const LOGIN = 'LOGIN',
        FETCH = 'FETCH',
        ANALYSE = 'ANALYSE';

  function buttonState() {
    if (props.userDetails.loggedIn) {
      return FETCH;
    } else {
      return LOGIN;
    }
  }

  function onClick() {
    if (buttonState() === LOGIN) {
      login();
    } else {
      props.fetchPlaylists();
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
