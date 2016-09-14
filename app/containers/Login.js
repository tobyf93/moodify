import { connect } from 'react-redux';
import React, { Component } from 'react';
import BigButton from '../components/BigButton';
import { hashHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.userDetails.loggedIn) {
      hashHistory.push('/fetch');
    }
  }

  login() {
    window.location = '/login';
  }

  // render big button
  render() {
    return (
      <BigButton
        text="Login"
        onClick={this.login}
      />
    );
  }
}

export default connect((state) => state)(Login)
