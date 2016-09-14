import React, { Component } from 'react';

export default class BigButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div  id="button"
            onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }
}
