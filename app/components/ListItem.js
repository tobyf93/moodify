import React, { PropTypes } from 'react';

const ListItem = ({ itemClicked, selected, thumbnail, title, subTitle }) => {


  return (
    <div onClick={itemClicked} className="list-item">
      <div className="list-item-thumbnail">
        <img src={thumbnail} />
      </div>
      <div className="list-item-desc">
        <div className="list-item-titles">
          <div className="list-item-title">{title} {selected ? '*' : ''}</div>
          <div className="list-item-sub-title">{subTitle}</div>
        </div>
      </div>
      <div className="list-item-icon">
        &gt;
      </div>
    </div>
  );
}

ListItem.propTypes = {
  itemClicked: PropTypes.func.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
}

export default ListItem;
