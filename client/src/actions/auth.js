import axios from 'axios';
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from './actionTypes';

export function loginUser(username, password) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/user/login', { username, password });
      return dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.data,
      });
    } catch (err) {
      if (err.response)
        throw new Error(err.response.data.message)
      else
        throw err
    }
  };
}

export function logoutUser() {
  return dispatch => dispatch({
    type: USER_LOGOUT,
  });
}

export function registerUser(username, password) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/user', { username, password })
      return dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.data
      });
    } catch (err) {
      if (err.response)
        throw new Error(err.response.data.message)
      else
        throw err
    }
  }
}

export function updateUser(userId, data) {
  return async dispatch => {
    try {
      console.log(data);
      const res = await axios.patch(`http://localhost:4000/api/user/${userId}`, data);
      // const res = await fetch(
      //   `http://localhost:4000/api/user/${userId}`,
      //   {
      //     method: 'PATCH',
      //     body: data
      //   }
      // );
      return dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.data
      });
    } catch (err) {
      if (err.response)
        throw new Error(err.response.data.message)
      else
        throw err
    }
  }
}
