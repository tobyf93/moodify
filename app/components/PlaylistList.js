import React, { PropTypes } from 'react';
import ListItem from './ListItem';

const List = ({ togglePlaylist, playlists }) => {
  let listItems = [];

  const itemClicked = (id) => {
    togglePlaylist(id);
  }

  playlists.forEach(playlist => {
    const id = playlist.id;
    let listItemClass = 'list-item ';
    let iconClass = 'fa ';

    if (playlist.selected) {
      listItemClass += 'selected';
      iconClass += 'fa-check-circle-o tick-icon'
    } else {
      iconClass += 'fa-times-circle-o'
    }

    let thumbnail = (
      <div className="list-item-thumbnail">
        <img src={playlist.thumbnail.url} />
      </div>
    );

    listItems.push(
      <ListItem
        key={id}
        listItemClass={listItemClass}
        itemClicked={itemClicked.bind(this, id)}
        thumbnail={thumbnail}
        title={playlist.name}
        subTitle={playlist.trackCount + ' tracks'}
        iconClass={iconClass}
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
