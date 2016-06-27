import apiCall from '../utils/apiCall';
import * as actionTypes from '../constants/AuthConstants';

export function login({ data, router }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_LOGIN_REQUESTED,
    });

    return apiCall({
      method: 'POST',
      path: '/login',
      data,
    })
    .then((res) => {
      const { email, access_token } = res.data;
      sessionStorage.setItem('accessToken', access_token);
      sessionStorage.setItem('email', email);
      dispatch({
        type: actionTypes.AUTH_LOGIN_SUCCEED,
        data: res.data,
      });
      router.push('/app');
    })
    .catch((res) => {
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


export function logout() {
  return (dispatch) => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('email');
    dispatch({
      type: actionTypes.AUTH_LOGGED_OUT,
    });
  };
}
