import { connect } from 'react-redux';
import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  // render big button
  render() {
    return (<div>this is login</div>);
  }
}

export default connect((state) => state)(Login)
