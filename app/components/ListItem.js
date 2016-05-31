import React, { PropTypes } from 'react';

const ListItem = ({ itemClicked, selected, thumbnail, title, subTitle }) => {
  return (
    <li onClick={itemClicked}
        className="list-group-item">
      <div className="media">
        <div className="media-left">
          <img height="60px" className="media-object" src={thumbnail} alt="..." />
        </div>
        <div className="media-body">
          <h4 className="media-heading">{title} {selected ? '*' : ''}</h4>
          <h4 className="media-heading">{subTitle}</h4>
        </div>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  itemClicked: PropTypes.func.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
}

export default ListItem;
