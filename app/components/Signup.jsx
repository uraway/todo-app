import React, { Component, PropTypes } from 'react';
import Title from 'react-title-component';

import { TextField, RaisedButton } from 'material-ui';

import ErrorMessage from './ui/ErrorMessage';

export default class Signup extends Component {

  static propTypes = {
    signup: PropTypes.shape({
      type: PropTypes.string,
      isLoading: PropTypes.bool,
      errors: PropTypes.object,
    }).isRequired,

    signupActions: PropTypes.shape({
      signup: PropTypes.func.isRequired,
    }).isRequired,

    location: PropTypes.object,
    backPathStore: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  _handleSignupSubmit() {
    const { signupActions, backPathStore } = this.props;
    const { router } = this.context;
    const data = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    };
    signupActions.signup({ data, router, backPathStore });
  }

  handleKeyDownEvent(e) {
    const EnterKeyCode = 13;
    if (e.keyCode === EnterKeyCode) {
      this._handleSignupSubmit();
    }
  }

  render() {
    return (
      <div>
        <Title render={(previousTitle) => `Signup -${previousTitle}`} />
        <TextField
          ref="email"
        <p>Welcome to TODOS! Create your account here.</p>
          hintText="user@example.com"
          floatingLabelText="Email"
          onKeyDown={::this.handleKeyDownEvent}
        />
        <TextField
          ref="password"
          type="password"
          floatingLabelText="Password"
          onKeyDown={::this.handleKeyDownEvent}
        <ErrorMessage errors={errors} />
        <br />
        <br />
        <FlatButton
          onClick={() => router.push('/login')}
          label="login?"
          secondary
        />
        <RaisedButton label="Signup" onTouchTap={this._handleSignupSubmit.bind(this)} />
      </div>
    );
  }
}
