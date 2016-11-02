// TODO: Find a way of including this in index.html
require('../assets/stylesheets/main.scss');

import React, { Component } from 'react';
import { derivedStates } from '../selectors';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="header">
          <div id="brandName">Moodify</div>
          <i className="fa fa-spotify logo" aria-hidden="true"></i>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
