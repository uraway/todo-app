import * as actionTypes from '../constants/SignupConstants';

const initialState = {
  type: null,
  data: null,
  isLoggedIn: false,
  errors: null,
  isLoading: false,
};

export default function signup(state = initialState, action) {
  const { type, data, errors } = action;

  switch (type) {
    case actionTypes.SIGNUP_REQUESTED:
      return {
        type,
        data,
        isLoggedIn: false,
        errors: null,
        isLoading: true,
      };
    case actionTypes.SIGNUP_SUCCEED:
      return {
        type,
        data,
        isLoggedIn: true,
        errors: null,
        isLoading: false,
      };
    case actionTypes.SIGNUP_FAILED:
      return {
        type,
        errors,
        data: null,
        isLoggedIn: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
