import React, { Component, PropTypes } from 'react';
import Title from 'react-title-component';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

export default class Todos extends Component {

  static propTypes = {
    todos: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.array,
      isLoading: PropTypes.bool,
      isCreating: PropTypes.bool,
      isUpdating: PropTypes.bool,
      errors: PropTypes.object,
    }).isRequired,

    auth: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.object,
      errors: PropTypes.object,
      isLoading: PropTypes.bool,
      isCreating: PropTypes.bool,
      isUpdating: PropTypes.bool,
    }).isRequired,

    todosActions: PropTypes.shape({
      loadTodos: PropTypes.func.isRequired,
    }).isRequired,

    params: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentWillReceiveProps(newProps) {
    const { todos } = newProps;
    if (todos.type === 'TODOS_LOAD_SUCCEED') {
      this.setState({
        data: todos.data,
      });
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Title render={(previousTitle) => `Todos -${previousTitle}`} />
        <TextField
          name="addTodo"
          floatingLabelText="Add a new todo."
        />
      {data.map((row, index) => (
        <ul key={index}>
          <Checkbox
            defaultChecked={row.completed}
            label={row.text}
          />
        </ul>
      ))}
      </div>
    );
  }
}
