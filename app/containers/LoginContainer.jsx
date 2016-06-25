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
    backPathStore: PropTypes.string,
  };

  render() {
    const { dispatch, location } = this.props;
    const { router, backPathStore } = this.context;
    return (
      <Login
        router={router}
        location={location}
        backPathStore={backPathStore}
        authActions={bindActionCreators(AuthActions, dispatch)}
        {...this.props}
      />
    );
  }
}
