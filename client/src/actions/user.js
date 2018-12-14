import axios from 'axios';
import { USER_LOGGED_IN, USER_LOGIN_FAILURE } from './actionTypes';

export function loginUser(username, password) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/user/login', {
        username,
        password
      });
      return dispatch({
        type: USER_LOGGED_IN,
        data: res.data
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
        });
      }
    }
  };
}
