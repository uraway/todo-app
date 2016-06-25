import React, { Component } from 'react';
import REVISION from '../../config/revision';

export default class App extends Component {
  render() {
    return (
      <div>
        <p>Front-end application for Todos.
          <br />
          Revision is {REVISION}
        </p>
      </div>
    );
  }
}
