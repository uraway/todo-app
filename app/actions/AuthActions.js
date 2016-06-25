import apiCall from '../utils/apiCall';
import * as actionTypes from '../constants/AuthConstants';

export function setLoggedInState(user) {
  return {
    type: actionTypes.AUTH_LOGGED_IN,
    user,
  };
}

export function login({ data, authAgent, router, backPathStore }) {
  return dispatch => {
    dispatch({
      type: actionTypes.AUTH_LOGIN_REQUESTED,
    });

    return apiCall({
      method: 'POST',
      path: '/login',
      data,
    })
    .then(res => {
      const { email, access_token } = res.data.data.attributes;

      authAgent.login(email, access_token, {
        sessionOnly: false,
        cb: () => {
          dispatch({
            type: actionTypes.AUTH_LOGIN_SUCCEED,
            user: email,
          });
          router.push(backPathStore);
        },
      });
    })
    .catch(res => {
      if (res.data === undefined) return;

      dispatch({
        type: actionTypes.AUTH_LOGIN_FAILED,
        errors: {
          code: res.status,
          data: res.data.error,
        },
      });
    });
  };
}


export function logout({ authAgent, router, backPath }) {
  return dispatch => {
    authAgent.logout(() => {
      dispatch({
        type: actionTypes.AUTH_LOGGED_OUT,
      });
      router.push(backPath);
    });
  };
}
