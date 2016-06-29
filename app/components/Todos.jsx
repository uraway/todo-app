import React, { Component, PropTypes } from 'react';
import Title from 'react-title-component';

import TextField from 'material-ui/TextField';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

export default class Todos extends Component {

  static propTypes = {
    todos: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.object,
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
      data: {
        text: 'My first todo',
      },
    };
  }

  componentWillReceiveProps(newProps) {
    const { todos } = newProps;
    if (todos.type === 'TODOS_LOAD_FAILED') return;

    this.state = {
      data: todos.data,
    };
  }

  loadTodos = () => {
    const { todosActions, auth } = this.props;
    const params = { user_id: auth.id };
    todosActions.loadTodos({ params });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Title render={(previousTitle) => `Todos -${previousTitle}`} />
        <TextField />
        <Table>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.text}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
