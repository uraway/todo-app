import React, { Component, PropTypes } from 'react';

export default class ErrorMessage extends Component {
  static propTypes = {
    errors: PropTypes.object,
  };

  getStyles() {
    const styles = {
      warning: {
        color: 'red',
      },
    };
    return styles;
  }

  render() {
    const styles = this.getStyles();
    const { errors } = this.props;
    let error;
    if (errors) {
      error =
        <p style={styles.warning}>{errors.code} {errors.data}</p>;
    }
    return (
      <div>
        {error}
      </div>
    );
  }
}
