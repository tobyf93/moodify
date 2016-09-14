import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actions from '../redux/actions/playlists';
import { bindActionCreators } from 'redux';
import ListItem from '../components/ListItem';
import BigButton from '../components/BigButton';
import _ from 'lodash';

class Playlists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlaylists: this.selectedPlaylists(this.props.playlists)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedPlaylists: this.selectedPlaylists(nextProps.playlists)
    });
  }

  selectedPlaylists(playlists) {
    return _.filter(playlists, (playlist) => {
      return playlist.selected;
    });
  }

  itemClicked(id) {
    this.props.togglePlaylist(id);
  }

  getListItems() {
    return _.map(this.props.playlists, (playlist) => {
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

      return (
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
  }

  buttonText() {
    const noOfSelectedPlaylists = this.state.selectedPlaylists.length;
    let text = `Analyse ${noOfSelectedPlaylists} playlist`;

    if (noOfSelectedPlaylists != 1) {
      text += 's';
    }

    return text;
  }

  render() {
    return (
      <div className="list">
        <BigButton
          text={this.buttonText()}
          onClick={() => this.props.analysePlaylists(this.state.selectedPlaylists)}
        />
        {this.getListItems()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
