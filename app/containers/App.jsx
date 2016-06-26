import React, { Component } from 'react';
import REVISION from '../../config/revision';

import FlatButton from 'material-ui/FlatButton';

export default class App extends Component {
  render() {
    return (
      <div>
        <FlatButton
          label="signup"
        />
        <FlatButton
          label="login"
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
