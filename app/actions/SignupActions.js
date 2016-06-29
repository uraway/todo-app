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
      const { data } = res.data;
      console.log(data);
      dispatch({
        type: actionTypes.SIGNUP_SUCCEED,
      });
      router.push('/app');
    })
    .catch((res) => {
      if (res.data === undefined) return;
      dispatch({
        type: actionTypes.SIGNUP_FAILED,
        errors: {
          code: res.status,
          data: res.data.error ? res.data.error : res.statusText,
        },
      });
    });
  };
}
