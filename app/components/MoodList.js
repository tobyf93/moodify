import React, { PropTypes } from 'react';
import ListItem from './ListItem';

const MoodList = ({ tracksByMood }) => {
  let listItems = [];

  const itemClicked = (id) => {
    togglePlaylist(id);
  }

  for (let mood in tracksByMood) {
    console.log(mood);
    let tracks = tracksByMood[mood];
    let thumbnail = (
      <div className="list-item-thumbnail mood">
        {mood[0]}
      </div>
    );

    listItems.push(
      <ListItem
        key={mood}
        listItemClass="list-item"
        thumbnail={thumbnail}
        title={mood}
        subTitle={tracks.length + ' tracks'}
        iconClass="fa fa-check-circle-o tick-icon"
      />
    );
  }

  return (
    <div className="list">
      {listItems}
    </div>
  );
}

MoodList.propTypes = {
  // togglePlaylist: PropTypes.func.isRequired,
  // playlists: PropTypes.array.isRequired
}

export default MoodList;
