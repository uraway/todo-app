import React, { Component, PropTypes } from 'react';
import { TextField, RaisedButton } from 'material-ui';

export default class Login extends Component {

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
        <TextField
          ref="email"
          hintText="user@example.com"
          floatingLabelText="Email"
          onKeyDown={::this.handleKeyDownEvent}
        />
        <TextField
          ref="password"
          type="password"
          floatingLabelText="Password"
          onKeyDown={::this.handleKeyDownEvent}
        />
        <RaisedButton label="Signup" onTouchTap={this._handleSignupSubmit.bind(this)} />
      </div>
    );
  }
}
