import * as actionTypes from '../constants/AuthConstants';

const initialState = {
  type: null,
  data: null,
  isLoggedIn: false,
  errors: null,
  isLoading: false,
};

export default function auth(state = initialState, action) {
  const { type, data, errors } = action;

  switch (type) {
    case actionTypes.AUTH_LOGGED_IN:
      return {
        type,
        data,
        isLoggedIn: true,
        errors: null,
        isLoading: false,
      };
    case actionTypes.AUTH_LOGIN_REQUESTED:
      return {
        type,
        data: null,
        isLoggedIn: false,
        errors: null,
        isLoading: true,
      };
    case actionTypes.AUTH_LOGIN_SUCCEED:
      return {
        type,
        data,
        isLoggedIn: true,
        errors: null,
        isLoading: false,
      };
    case actionTypes.AUTH_LOGIN_FAILED:
      return {
        type,
        errors,
        data: null,
        isLoggedIn: false,
        isLoading: false,
      };
    case actionTypes.AUTH_LOGGED_OUT:
      return {
        type,
        data: null,
        isLoggedIn: false,
        errors: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
