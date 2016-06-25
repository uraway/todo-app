import React, { Component, PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DefaultBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppCanvas from 'material-ui/internal/AppCanvas';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import spacing from 'material-ui/styles/spacing';
import { yellow200 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
/*
import setCookieDomain from '../utils/setCookieDomain';
import Auth from '../utils/Auth';
const cookieDomain = setCookieDomain(document.location.hostname);
const authAgent = new Auth(document, cookieDomain);
*/
import * as AuthActions from '../actions/AuthActions';

@connect((state) => ({
  auth: state.auth,
}))

class Master extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    authAgent: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
    email: PropTypes.string,
    userId: PropTypes.number,
    timeZone: PropTypes.string,
    router: PropTypes.object,
    backPathStore: PropTypes.string,
  };

  state = {
    muiTheme: getMuiTheme(DefaultBaseTheme),
    openDialog: false,
    router: this.context.router,
    backPathStore: this.props.location.pathname === '/login' ? '/' : this.props.location.pathname,
    openDrawer: false,
  };

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      authAgent: this.state.authAgent,
      isLoggedIn: this.state.isLoggedIn,
      email: this.state.email,
      backPathStore: this.state.backPathStore,
    };
  }

  componentWillMount() {
    const newMuiTheme = this.state.muiTheme;
    newMuiTheme.inkBar.backgroundColor = yellow200;
    this.setState({
      muiTheme: newMuiTheme,
    });
    const { isLoggedIn, router } = this.state;
    if (isLoggedIn === false && router.isActive('/login') === false) {
      router.push('/login');
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
      router: nextContext.router ? nextContext.router : this.state.router,
      backPathStore: this.props.location.pathname === '/login' ? '/' : this.props.location.pathname,
    });
    const { isLoggedIn, router } = this.state;
    if (isLoggedIn === false && router.isActive('/login') === false) {
      router.push('/login');
    }
  }

  getStyles() {
    const width = this.props.width;
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
    };

    if (width === LARGE) {
      styles.appBar.zIndex = this.state.muiTheme.zIndex.drawer + 1;
    }

    return styles;
  }

  _getAppBar() {
    const styles = this.getStyles();
    const { location, width } = this.props;
    const title = this._getPageTitle(location.pathname);
    const iconElementLeft = (width !== LARGE) ?
    (
      <IconButton onTouchTap={this.toggleDrawer}><MenuIcon /></IconButton>
    ) : <span />;
    const iconElementRight = this.state.email ?
    (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        closeOnItemTouchTap
      >
        <MenuItem primaryText={this.state.email} disabled />
        <Divider />
        <MenuItem primaryText="Logout" onTouchTap={this.handleOpen} />
      </IconMenu>
    ) : null;

    return (
      <div className="ignore-print">
        <AppBar
          title={title}
          iconElementLeft={iconElementLeft}
          zDepth={0}
          style={styles.appBar}
          iconElementRight={iconElementRight}
        />
      </div>
    );
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

  toggleDrawer = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  }

  handleChangeRequestNavDrawer = (open) => {
    this.setState({ openDrawer: open });
  };

  handleChangeList = (event, value) => {
    const { router } = this.context;
    if (value === '/logout') {
      this.handleOpen();
    } else {
      router.push(value);
      this.setState({ openDrawer: false });
    }
  }

  handleLogout = () => {
    const { authAgent } = this.state;
    const { dispatch } = this.props;
    const { router } = this.context;
    const authActions = bindActionCreators(AuthActions, dispatch);
    const backPath = '/login';
    authActions.logout({ authAgent, router, backPath });
    this.handleClose();
  }

  handleOpen = () => {
    this.setState({ openDialog: true });
  }

  handleClose = () => {
    this.setState({ openDialog: false });
  }

  render() {
    const styles = this.getStyles();
    const { location, children, width } = this.props;
    const actions = [
      <FlatButton
        label="No, keep me login"
        secondary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Yes, log me out"
        primary
        keyboardFocued
        onTouchTap={this.handleLogout}
      />,
    ];

    const pathname = location.pathname;
    const title = this._getPageTitle(pathname);
    if (width === LARGE && title !== '') {
      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
    }

    return (
      <AppCanvas>
        <Dialog
          title="LOGOUT"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
        >
        Are you sure want to logout?
        </Dialog>
        {this._getAppBar()}
        <div style={styles.root} className="print-main">
          <div style={styles.content} className="print-main">
            {children}
          </div>
        </div>
      </AppCanvas>
    );
  }
}

export default withWidth({ largeWidth: 1025 })(Master);
