import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as AuthActions from '../actions/AuthActions';

@connect((state) => ({
  auth: state.auth,
}))

export default class LoginContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const { dispatch, location } = this.props;
    const { router } = this.context;
    return (
      <Login
        router={router}
        location={location}
        authActions={bindActionCreators(AuthActions, dispatch)}
        {...this.props}
      />
    );
  }
}
