import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ListItem from '../components/ListItem';

class MoodList extends Component {
  constructor(props) {
    super(props);
  }

  itemClicked() {
    console.log('mood clicked');
  }

  getListItems() {
    let listItems = [];

    for (let mood in this.props.tracksByMood) {
      let tracks = this.props.tracksByMood[mood];
      let moodClass = `list-item-thumbnail mood ${mood}`;

      let thumbnail = (
        <div className={moodClass}>
          {mood[0]}
        </div>
      );

      listItems.push(
        <ListItem
          key={mood}
          listItemClass="list-item"
          itemClicked={() => this.itemClicked()}
          thumbnail={thumbnail}
          title={mood}
          subTitle={tracks.length + ' tracks'}
          iconClass="fa fa-chevron-down chevron-icon"
        />
      );

      tracks.forEach((track) => {
        listItems.push(
          <ListItem
            key={track.id}
            listItemClass="list-item"
            itemClicked={() => this.itemClicked()}
            title={track.name}
            subTitle={track.artists}
          />
        );
      });
    }

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

const mapStateToProps = (state) => {
  return {
    tracksByMood: state.moods
  };
}

export default connect(mapStateToProps)(MoodList);
