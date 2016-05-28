// TODO: Find a way of including this in index.html
require('../assets/stylesheets/main.scss');

import React from 'react';
import Header from './Header';
import List from './List';

export default function Main(props) {
  return (
    <div>
      <Header
        fetchPlaylists={props.actions.fetchPlaylists}
        userDetails={props.userDetails}
      />
      <List
        selectPlaylist={props.actions.selectPlaylist}
        playlists={props.playlists}
      />

    </div>
  );
}




/*
var App = React.createClass({
    getInitialState: function() {
      gon.playlists.forEach(function(playlist) {
        playlist.selected = true;
      });

      return {
        data: gon.playlists,
        display: 'PLAYLISTS',
      };
    },

    handleListClick: function(index) {
      var data = this.state.data;

      if (data[index].selected === true) {
        data[index].selected = false;
      } else {
        data[index].selected = true;
      }

      this.setState({ data: data });
    },

    handleAnalyzeDone: function(data) {
      this.setState({
        data: data,
        display: 'MOODS'
      });
    },

    render: function() {
      return (

      );
    }
  });

  var Header = React.createClass({
    getInitialState: function() {
      return {
        showProgress: false,
        totalSongs: 0
      };
    },

    handleButtonClick: function(e) {
      if (this.props.data.length === 0) {
        window.location.href = '/auth/spotify';
      } else if (this.state.showProgress === false){
        var songCount = 0;
        this.props.data.forEach(function(playlist) {
          if (playlist.selected === true) {
            songCount += playlist.total;
          }
        });

        this.setState({
          showProgress: true,
          songsAnalyzed: 0,
          totalSongs: songCount
        });

        this.analyzePlaylists();
        this.pollStatus();
      }
    },

    analyzePlaylists: function() {
      $.ajax(
         {
           type: "POST",
           url: '/analyze',
           beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
           data: JSON.stringify(gon.playlists),
           dataType: "json",
           contentType: 'application/json'
         }
       );
    },

    pollStatus: function() {
      setTimeout(this._pollStatus, 1000);
    },

    _pollStatus: function() {
      $.get('/status', function(data) {
        var count = 0;

        for (var key in data) {
          count += data[key].length;
        }

        this.setState({ songsAnalyzed: count });
        if (this.state.songsAnalyzed < this.state.totalSongs) {
          this.pollStatus();
        } else {
          this.props.analyzeDone(data);
        }

      }.bind(this));
    },

    render: function() {
      var label = 'Login';
      var className = '';

      if (this.state.showProgress === true) {
        var word = this.state.totalSongs === 1 ? 'song' : 'songs';
        className = 'disabled';
        label = 'Analyzed ' + this.state.songsAnalyzed + ' of ' + this.state.totalSongs + ' ' + word;
      } else if (this.props.data.length > 0) {
        label = 'Analyze Music Now';
      }

      return (

      )
    }
  });

  var List = React.createClass({
    render: function() {
      var title = this.props.display === 'PLAYLISTS' ? 'My Playlists' : 'Results';

      var header = (

      );

      var items = [];
      if (this.props.display === 'PLAYLISTS') {
        for (var i = 0; i < this.props.data.length; i++) {
          var boundClick = this.props.onClick.bind(null, i);

          items.push(<PlaylistItem
                      key={i}
                      data={this.props.data[i]}
                      onClick={boundClick}/>);
        }
      } else {
        for (var mood in this.props.data) {
          items.push(<MoodItem
                      key={i}
                      mood={mood}
                      data={this.props.data[mood]}
                      onClick={boundClick}/>);
        }
      }

      return (


      )
    }
  });

  var PlaylistItem = React.createClass({
    render: function() {
      var word = this.props.data.total === 1 ? 'track' : 'tracks';
      var icon = 'glyphicon';

      if (this.props.data.selected === true) {
        icon += ' glyphicon-ok-circle';
      } else {
        icon += ' glyphicon-remove-circle';
      }

      return (
        <li className="list-group-item"
          key={this.props.key}
          onClick={this.props.onClick}>
          <div className={icon} aria-hidden="true"></div>
          <div className="title">
            {this.props.data.name}<br />
            {this.props.data.total} {word}
          </div>
        </li>
      );
    }
  });

  var MoodItem = React.createClass({
    render: function() {
      var word = this.props.data.total === 1 ? 'track' : 'tracks';
      var className = 'list-group-item ' + this.props.mood;

      return (
        <li className={className}
          key={this.props.key}
          onClick={this.props.onClick}>
          <div className="title">
            {this.props.mood.toUpperCase()}<br />
            {this.props.data.length} {word}
          </div>
        </li>
      );
    }
  });

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
*/
