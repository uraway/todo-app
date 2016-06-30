import * as actionTypes from '../constants/TodosConstants';

const initialState = {
  type: null,
  data: null,
  errors: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
};

export default function todos(state = initialState, action) {
  const { type, data, errors } = action;

  switch (type) {
    case actionTypes.TODOS_ADD_REQUESTED:
      return {
        ...state,
        type,
        data,
        isCreating: true,
        errors: null,
      };
    case actionTypes.TODOS_ADD_SUCCEED:
      return {
        ...state,
        type,
        data,
        errors: null,
        isCreating: false,
      };
    case actionTypes.TODOS_ADD_FAILED:
      return {
        ...state,
        type,
        errors,
        data: null,
        isCreating: false,
      };
    case actionTypes.TODOS_UPDATE_REQUESTED:
      return {
        ...state,
        type,
        isUpdating: true,
      };
    case actionTypes.TODOS_UPDATE_SUCCEED:
      return {
        ...state,
        type,
        data,
        errors: null,
        isUpdating: false,
      };
    case actionTypes.TODOS_UPDATE_FAILED:
      return {
        ...state,
        type,
        data: null,
        errors: null,
        isUpdating: false,
      };
    case actionTypes.TODOS_LOAD_REQUESTED:
      return {
        ...state,
        type,
        isLoading: true,
      };
    case actionTypes.TODOS_LOAD_SUCCEED:
      return {
        ...state,
        type,
        data,
        errors: null,
        isLoading: false,
      };
    case actionTypes.TODOS_LOAD_FAILED:
      return {
        ...state,
        type,
        errors,
        data: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
