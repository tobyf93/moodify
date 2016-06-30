import React, { PropTypes } from 'react';

const ListItem = ({ itemClicked, selected, thumbnail, title, subTitle }) => {
  let listItemClass = 'list-item ';
  let iconClass = 'fa ';

  if (selected) {
    listItemClass += 'selected';
    iconClass += 'fa-check-circle-o tick-icon'
  } else {
    iconClass += 'fa-times-circle-o'
  }

  return (
    <div onClick={itemClicked} className={listItemClass}>
      <div className="list-item-thumbnail">
        <img src={thumbnail} />
      </div>
      <div className="list-item-desc">
        <div className="list-item-titles">
          <div className="list-item-title">{title}</div>
          <div className="list-item-sub-title">{subTitle}</div>
        </div>
      </div>
      <div className="list-item-icon">
        <i className={iconClass} aria-hidden="true"></i>
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
