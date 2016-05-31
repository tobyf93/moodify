import React, { PropTypes } from 'react';
import ListItem from './ListItem';

const List = ({ togglePlaylist, playlists }) => {
  let listItems = [];

  const itemClicked = (id) => {
    togglePlaylist(id);
  }

  playlists.forEach(playlist => {
    const id = playlist.id;

    listItems.push(
      <ListItem
        key={id}
        itemClicked={itemClicked.bind(this, id)}
        selected={playlist.selected}
        thumbnail={playlist.thumbnail.url}
        title={playlist.name}
        subTitle={playlist.trackCount + ' tracks'}
      />
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
        {listItems}
      </ul>
    </div>
  );
}

List.propTypes = {
  togglePlaylist: PropTypes.func.isRequired,
  playlists: PropTypes.array.isRequired
}

export default List;
