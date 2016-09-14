import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actions from '../redux/actions/playlists';
import { bindActionCreators } from 'redux';
import ListItem from '../components/ListItem';
import BigButton from '../components/BigButton';

class Playlists extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.playlists.length) {
      hashHistory.push('/');
    }
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
        <BigButton
          text="something"
        />
        {this.getListItems()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
