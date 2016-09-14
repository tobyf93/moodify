import React, { PropTypes } from 'react';

const ListItem = (props) => {
  return (
    <div onClick={props.itemClicked} className={props.listItemClass}>
      {props.thumbnail}
      <div className="list-item-desc">
        <div className="list-item-titles">
          <div className="list-item-title">{props.title}</div>
          <div className="list-item-sub-title">{props.subTitle}</div>
        </div>
      </div>
      <div className="list-item-icon">
        <i className={props.iconClass} aria-hidden="true"></i>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  itemClicked: PropTypes.func.isRequired,
  thumbnail: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
}

export default ListItem;
