import * as actionTypes from '../constants/SignupConstants';

const initialState = {
  type: null,
  user: null,
  isLoggedIn: false,
  errors: null,
  isLoading: false,
};

export default function signup(state = initialState, action) {
  const { type, user, errors } = action;

  switch (type) {
    case actionTypes.SIGNUP_REQUESTED:
      return {
        type,
        user,
        isLoggedIn: false,
        errors: null,
        isLoading: true,
      };
    case actionTypes.SIGNUP_SUCCEED:
      return {
        type,
        user,
        isLoggedIn: true,
        errors: null,
        isLoading: false,
      };
    case actionTypes.SIGNUP_FAILED:
      return {
        type,
        errors,
        user: null,
        isLoggedIn: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
