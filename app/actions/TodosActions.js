import apiCall from '../utils/apiCall';
import * as actionTypes from '../constants/TodosConstants';

export function loadTodos() {
  const userId = sessionStorage.getItem('userId');
  return (dispatch) => {
    dispatch({
      type: actionTypes.TODOS_LOAD_REQUESTED,
    });

    return apiCall({
      method: 'GET',
      path: `/users/${userId}/todos`,
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: actionTypes.TODOS_LOAD_SUCCEED,
        data: res.data,
      });
    })
    .catch((res) => {
      if (res.data === undefined) res.data = 'Error: Network Error.';
      dispatch({
        type: actionTypes.TODOS_LOAD_FAILED,
        errors: {
          code: res.status,
          data: res.data.error ? res.data.error : res.statusText ? res.statusText : res.data,
        },
      });
    });
  };
}
