import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Signup from '../components/Signup';
import * as SignupActions from '../actions/SignupActions';

@connect((state) => ({
  signup: state.signup,
}))

export default class SignupContainer extends Component {

  static propTypes = {
    signup: PropTypes.object.isRequired,
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
      <Signup
        router={router}
        location={location}
        backPathStore={backPathStore}
        signupActions={bindActionCreators(SignupActions, dispatch)}
        {...this.props}
      />
    );
  }
}
