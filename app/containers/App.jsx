import React, { Component, PropTypes } from 'react';
import REVISION from '../../config/revision';

import FlatButton from 'material-ui/FlatButton';

export default class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  render() {
    const { router } = this.context;
    return (
      <div>
        <FlatButton
          label="signup"
          onClick={() => router.push('/signup')}
        />
        <FlatButton
          label="login"
          onClick={() => router.push('/login')}
        />
        <br />
        <br />
        <h1>Hello, your Todos!</h1>
        <br />
        <p>
          Revision is {REVISION}
        </p>
      </div>
    );
  }
}
