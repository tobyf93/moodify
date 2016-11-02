import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';

class MoodItem extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  getItems() {
    let items = [];

    let moodThumbnail = (
      <div className="list-item-thumbnail mood">
        {this.props.mood[0]}
      </div>
    );

    let iconClass = 'fa chevron-icon fa-chevron-';
    if (this.state.expanded) {
      iconClass += 'up';
    } else {
      iconClass += 'down';
    }

    items.push(
      <ListItem
        key={0}
        listItemClass="list-item"
        thumbnail={moodThumbnail}
        title={this.props.mood}
        subTitle={this.props.tracks.length + ' tracks'}
        iconClass={iconClass}
        itemClicked={() => { this.setState({ expanded: !this.state.expanded }); }}
      />
    );

    if (this.state.expanded) {
      this.props.tracks.forEach(track => {
        items.push(
          <ListItem
            key={track.id}
            listItemClass="list-item"
            title={track.name}
            subTitle={track.artists}
          />
        );
      })
    }

    return items;
  }

  render() {
    return(
      <div>
        {this.getItems()}
      </div>
    );
  }
}

MoodItem.propTypes = {
  mood: PropTypes.string,
  tracks: PropTypes.array
};

export default MoodItem;
