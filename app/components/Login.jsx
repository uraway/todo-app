import React, { Component, PropTypes } from 'react';
import { TextField, RaisedButton } from 'material-ui';

export default class Login extends Component {

  static propTypes = {
    auth: PropTypes.shape({
      type: PropTypes.string,
      isLoading: PropTypes.bool,
      errors: PropTypes.object,
    }).isRequired,

    authActions: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired,

    authAgent: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),

    location: PropTypes.object,
    backPathStore: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  _handleLoginSubmit() {
    const { authAgent, authActions, backPathStore } = this.props;
    const { router } = this.context;
    const data = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    };
    authActions.login({ data, authAgent, router, backPathStore });
  }

  handleKeyDownEvent(e) {
    const EnterKeyCode = 13;
    if (e.keyCode === EnterKeyCode) {
      this._handleLoginSubmit();
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
        <RaisedButton label="Login" onTouchTap={this._handleLoginSubmit.bind(this)} />
      </div>
    );
  }
}
