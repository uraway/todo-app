import React, { Component, PropTypes } from 'react';
import Title from 'react-title-component';

import { TextField, RaisedButton, FlatButton } from 'material-ui';

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

  constructor() {
    super();
    this.state = {
      errorText: '',
    };
  }

  handleSignupSubmit = () => {
    const { signupActions } = this.props;
    const { router } = this.context;
    const data = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    };
    signupActions.signup({ data, router });
  }

  handleKeyDownEvent = (e) => {
    const EnterKeyCode = 13;
    if (e.keyCode === EnterKeyCode) {
      this._handleSignupSubmit();
    }
  }

  handlePasswordChange = (e) => {
    const password = e.target.value;
    if (password.length < 6) {
      this.setState({ errorText: 'Password must be at least 6 characters length.' });
    } else {
      this.setState({ errorText: '' });
    }
  }

  render() {
    const { router } = this.context;
    const { errors } = this.props.signup;
    const { errorText } = this.state;

    return (
      <div>
        <Title render={(previousTitle) => `Signup -${previousTitle}`} />
        <p>Welcome to TODOS! Create your account.</p>
        <TextField
          ref="email"
          hintText="user@example.com"
          floatingLabelText="Email"
          onKeyDown={this.handleKeyDownEvent}
        />
        <TextField
          ref="password"
          type="password"
          floatingLabelText="Password"
          onKeyDown={this.handleKeyDownEvent}
          onChange={this.handlePasswordChange}
          errorText={errorText}
        />
        <RaisedButton label="Signup" onTouchTap={this.handleSignupSubmit} />
        <ErrorMessage errors={errors} />
        <br />
        <span>Do you alredy have an account?</span>
        <FlatButton
          onClick={() => router.push('/login')}
          label="login here"
          secondary
        />
      </div>
    );
  }
}
