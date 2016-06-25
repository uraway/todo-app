import React, { Component, PropTypes } from 'react';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/*
import setCookieDomain from '../utils/setCookieDomain';
import Auth from '../utils/Auth';
const cookieDomain = setCookieDomain(document.location.hostname);
const authAgent = new Auth(document, cookieDomain);

import * as AuthActions from '../actions/AuthActions';
*/

@connect((state) => ({
  auth: state.auth,
}))

export default class Master extends Component {

  static propTypes = {
    children: PropTypes.node,
    auth: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  _getPageTitle = (pathname) => {
    let title;
    switch (pathname) {
      case '/app': { title = 'App'; break; }
      case '/login': { title = 'LOGIN'; break; }
      default: { title = '404 Page Not Found'; }
    }
    return title;
  }

  render() {
    const { children } = this.props;

    return (
      <div className="print-main">
        <div className="print-main">
          {children}
        </div>
      </div>
    );
  }
}
