import React, { Component, PropTypes } from 'react';

export default (fetch) => (DecoratedComponent) => (
  class FetchDataDecorator extends Component {

    static fetchData = fetch;
    static propTypes = {
      location: PropTypes.object,
      params: PropTypes.object,
      initialRender: PropTypes.bool,
    };

    static contextTypes = {
      store: PropTypes.object,
    };

    componentDidMount() {
      if (this.props.initialRender) return;

      const { location, params } = this.props;
      const { store } = this.context;

      fetch({
        location,
        params,
        auth: sessionStorage.getItem('accessToken'),
        dispatch: store.dispatch,
      });
    }

    render() {
      return (
        <DecoratedComponent {...this.props} />
      );
    }
  }
);
