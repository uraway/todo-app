import React, { Component, PropTypes } from 'react';
import REVISION from '../../config/revision';

export default class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div>
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
