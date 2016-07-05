import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';

class List extends Component {
  constructor(props) {
    super(props);
  }

  itemClicked(id) {
    this.props.togglePlaylist(id);
  }

  getListItems() {
    let listItems = [];

    this.props.playlists.forEach(playlist => {
      const id = playlist.id;
      let listItemClass = 'list-item ';
      let iconClass = 'fa ';

      if (playlist.selected) {
        listItemClass += 'selected';
        iconClass += 'fa-check-circle-o tick-icon'
      } else {
        iconClass += 'fa-times-circle-o cross-icon'
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
          itemClicked={this.itemClicked.bind(this, id)}
          thumbnail={thumbnail}
          title={playlist.name}
          subTitle={playlist.trackCount + ' tracks'}
          iconClass={iconClass}
        />
      );
    });

    return listItems;
  }

  render() {
    return (
      <div className="list">
        {this.getListItems()}
      </div>
    );
  }
}

// List.propTypes = {
//   togglePlaylist: PropTypes.func.isRequired,
//   playlists: PropTypes.array.isRequired
// }

export default List;
