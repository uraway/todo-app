import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Todos from '../components/Todos';
import * as TodosActions from '../actions/TodosActions';
// import fetchData from '../decorators/fetchData';

@connect((state) => ({
  todos: state.todos,
}))

@connect((state) => ({
  auth: state.auth,
}))

/*
@fetchData(({ auth, params, dispatch }) => (
  dispatch(TodosActions.loadTodos({ auth, params }))
))
*/

export default class TodosContainer extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const { dispatch } = this.props;
    const { router } = this.context;
    return (
      <Todos
        router={router}
        todosActions={bindActionCreators(TodosActions, dispatch)}
        {...this.props}
      />
    );
  }
}
