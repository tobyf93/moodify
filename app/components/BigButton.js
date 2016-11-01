import React, { Component } from 'react';

export default class BigButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = 'big-button ';

    if (!this.props.onClick) {
      className += 'disabled';
    }

    return (
      <div  className={className}
            onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }
}
