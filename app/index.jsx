/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { render } from 'react-dom';
import routes from './routes';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import middleware from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, browserHistory } from 'react-router';

const reducer = combineReducers(reducers);
const store = applyMiddleware(middleware)(createStore)(reducer, window.__DATA__);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
