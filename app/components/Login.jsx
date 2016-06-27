import React, { Component, PropTypes } from 'react';
import Title from 'react-title-component';

import { TextField, RaisedButton, FlatButton } from 'material-ui';

import ErrorMessage from './ui/ErrorMessage';

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

    location: PropTypes.object,
    backPathStore: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  handleLoginSubmit() {
    const { authActions } = this.props;
    const { router } = this.context;
    const data = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    };
    authActions.login({ data, router });
  }

  handleKeyDownEvent(e) {
    const EnterKeyCode = 13;
    if (e.keyCode === EnterKeyCode) {
      this.handleLoginSubmit();
    }
  }

  render() {
    const { errors } = this.props.auth;
    const { router } = this.context;
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
        <RaisedButton label="Login" onTouchTap={::this.handleLoginSubmit} />
        <ErrorMessage errors={errors} />
        <br />
        <br />
        <p>Not a memeber yet?</p>
        <FlatButton
          onClick={() => router.push('/signup')}
          label="signup here!"
          secondary
        />
      </div>
    );
  }
}
