import React from 'react';

// TODO: Can this be done in webpack config?
var spotifyLogo = require("file!../assets/images/spotify.png");

export default function Header({ name, onNameChange }) {
  function login() {
    window.location.href = `${window.location.host}/login`;
  }

  return (
    <div id="header">
      <h1>Moodify</h1>
      <img src={spotifyLogo} />
      <div  id="button"
            onClick={login}>
        Login
      </div>
    </div>
  );
}
