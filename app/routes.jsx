import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Master from './containers/Master';
import App from './containers/App';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';
import TodosContainer from './containers/TodosContainer';

export default (
  <Route path="/" component={Master}>
    <IndexRoute component={App} />
    <Route path="app" component={App} />
    <Route path="login" component={LoginContainer} />
    <Route path="signup" component={SignupContainer} />
    <Route path="todos" component={TodosContainer} />
  </Route>
);
