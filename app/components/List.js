import React from 'react';

export default function List(props) {
  let playlists = [];

  props.playlists.forEach(playlist => {
    playlists.push(
      <li className="list-group-item">
        <div className="media">
          <div className="media-left">
            <a href="#">
              <img height="60px" className="media-object" src={playlist.thumbnail.url} alt="..." />
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{playlist.name}</h4>
            <h4 className="media-heading">{playlist.trackCount} Tracks</h4>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid list-header">
          <div className="navbar-header">
            <button type="button" className="btn btn-default" aria-label="Left Align">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            </button>
          </div>
          <span className="list-title">Some title goes here</span>
          <div className="navbar-header pull-right">
            <button type="button" className="btn btn-default" aria-label="Left Align">
              <span className="dots-icon glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <hr />
      </nav>

      <ul className="list-group">
        {playlists}
      </ul>
    </div>
  );
}
