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
    <div className="list">
      {listItems}
    </div>
  );
}

List.propTypes = {
  togglePlaylist: PropTypes.func.isRequired,
  playlists: PropTypes.array.isRequired
}

export default List;
