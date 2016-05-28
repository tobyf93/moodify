import React from 'react';
import ListItem from './ListItem';

export default function List(props) {
  let playlists = [];

  function itemClicked(id) {
    props.selectPlaylist(id);
  }

  props.playlists.forEach(playlist => {
    let id = playlist.id;

    playlists.push(
      <ListItem
        key={id}
        itemClicked={itemClicked.bind(this, id)}
        thumbnail={playlist.thumbnail.url}
        title={playlist.name}
        subTitle={playlist.trackCount + ' tracks'}
      />);
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
