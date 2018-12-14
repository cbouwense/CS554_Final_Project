import axios from 'axios';
import {
  USER_LOGIN_SUCCESS,
  USER_SESSION_RESUME,
  USER_LOGOUT
} from './actionTypes';

export function loginUser(username, password) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/user/login', {
        username,
        password
      });
      return dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.data
      });
    } catch (err) {
      if (err.response) throw new Error(err.response.data.message);
      else throw err;
    }
  };
}

export function resumeUserSession(sID) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/user/session', {
        sID
      });
      return dispatch({
        type: USER_SESSION_RESUME,
        data: res.data
      });
    } catch (err) {
      if (err.response) throw new Error(err.response.data.message);
      else throw err;
    }
  };
}

export function logoutUser(sID) {
  return async dispatch => {
    try {
      console.log(`sID: ${sID}`);

      const res = await axios.post('http://localhost:4000/api/user/logout/ ', {
        sID
      });
      return dispatch({
        type: USER_LOGOUT
      });
    } catch (err) {
      if (err.response) throw new Error(err.response.data.message);
      else throw err;
    }
  };
}

export function registerUser(username, password) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/user', {
        username,
        password
      });
      return dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.data
      });
    } catch (err) {
      if (err.response) throw new Error(err.response.data.message);
      else throw err;
    }
  };
}
