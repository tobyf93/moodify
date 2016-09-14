import { connect } from 'react-redux';
import React, { Component } from 'react';
import BigButton from '../components/BigButton';
import { hashHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
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

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  };
}

export default connect(mapStateToProps)(Login);
