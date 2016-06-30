import apiCall from '../utils/apiCall';
import * as actionTypes from '../constants/SignupConstants';

export function signup({ data, router }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGNUP_REQUESTED,
    });

    return apiCall({
      method: 'POST',
      path: '/users',
      data,
    })
    .then((res) => {
      const { email, access_token, id } = res.data;
      sessionStorage.setItem('accessToken', access_token);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('userId', id);
      dispatch({
        type: actionTypes.SIGNUP_SUCCEED,
        data: res.data,
      });
      router.push('/app');
    })
    .catch((res) => {
      if (res.data === undefined) res.data = 'Error: Network Error.';
      dispatch({
        type: actionTypes.SIGNUP_FAILED,
        errors: {
          code: res.status,
          data: res.data.error ? res.data.error : res.statusText ? res.statusText : res.data,
        },
      });
    });
  };
}
