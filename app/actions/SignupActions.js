import apiCall from '../utils/apiCall';
import * as actionTypes from '../constants/SignupConstants';

export function signup({ data, authAgent, router, backPathStore }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGNUP_REQUESTED,
    });

    return apiCall({
      method: 'POST',
      path: '/signup',
      data,
    })
    .then((res) => {
      const { email, access_token } = res.data.data.attributes;

      authAgent.login(email, access_token, {
        sessionOnly: false,
        cb: () => {
          dispatch({
            type: actionTypes.SIGNUP_SUCCEED,
            user: email,
          });
          router.push(backPathStore);
        },
      });
    })
    .catch((res) => {
      if (res.data === undefined) return;

      dispatch({
        type: actionTypes.SIGNUP_FAILED,
        errors: {
          code: res.status,
          data: res.data.error,
        },
      });
    });
  };
}
