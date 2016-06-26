import React, { Component, PropTypes } from 'react';
import Title from 'react-title-component';
import AppBar from 'material-ui/AppBar';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';
import withWidth, { MEDIUM, LARGE } from 'material-ui/utils/withWidth';
import { grey900 } from 'material-ui/styles/colors';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

class Master extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    auth: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme),
    };
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(),
    });
    const { auth, location } = this.props;
    const { router } = this.context;
    if (auth.isLoggedIn === false && location.pathname !== '/signup' && location.pathname !== '/app') {
      router.push('/login');
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
        left: 0,
        right: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.destopGutter,
        paddingLeft: 20,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
    };

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  render() {
    const {
      children,
    } = this.props;

    const styles = this.getStyles();

    const {
      prepareStyles,
    } = this.state.muiTheme;

    return (
      <div>
        <Title render="Todos" />
        <AppBar
          style={styles.appBar}
          zDepth={0}
          iconElementLeft={<br />}
        />
        <div style={prepareStyles(styles.root)}>
          <div style={prepareStyles(styles.content)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default withWidth()(Master);
