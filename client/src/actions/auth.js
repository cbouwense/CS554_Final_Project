import axios from 'axios';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from './actionTypes';

export function loginUser(username, password) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/user/login', { username, password });
      return dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.data,
      });
    } catch (err) {
      console.error(err);
      if (err.response) {
        return dispatch({
          type: USER_LOGIN_FAILURE,
          data: err.response.data
        });
      } else {
        return dispatch({
          type: USER_LOGIN_FAILURE,
          data: {
            message: err.message
          }
        })
      }
    }
  };
}

export function logoutUser() {
  return dispatch => dispatch({
    type: USER_LOGOUT,
  });
}
