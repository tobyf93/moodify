import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { hashHistory } from 'react-router';
import ListItem from '../components/ListItem';
import BigButton from '../components/BigButton';
import MoodItem from '../components/MoodItem';

class MoodList extends Component {
  constructor(props) {
    super(props);
  }

  itemClicked() {
    console.log('mood clicked');
  }

  getMoodItems() {
    let moodItems = [];

    for (let mood in this.props.tracksByMood) {
      moodItems.push(
        <MoodItem
          mood={mood}
          tracks={this.props.tracksByMood[mood]}
        />
      );
    }

    return moodItems;
  }

  render() {
    return (
      <div>
        <BigButton
          onClick={() => hashHistory.push('/playlists') }
          text="Back To Playlists"
        />
        <div className="list">
          {this.getMoodItems()}
        </div>
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
