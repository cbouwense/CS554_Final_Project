import axios from 'axios';
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from './actionTypes';

export function loginUser(username, password) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/user/login', { username, password }, {
        withCredentials: true
      });
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
  return dispatch => {
    try {
      const res = axios.post('http://localhost:4000/api/logout');
      return dispatch({
        type: USER_LOGOUT,
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

export function registerUser(username, password) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/user', { username, password })
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
  }
}

export function updateUser(userId, data) {
  return async dispatch => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/user/${userId}`, data);
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
  }
}

export function checkSession() {
  return async dispatch => {
    try {
      const res = await axios.get('http://localhost:4000/api/user/data/', {
        withCredentials: true
      });
      console.log(res.data);
      if (res.data)
        return dispatch({
          type: USER_LOGIN_SUCCESS,
          data: {
            ...res.data.user,
            exerciseEvents: res.data.exerciseEvents,
          },
        });
    } catch (err) {
      if (err.response)
        throw new Error(err.response.data.message)
      else
        throw err
    }
  }
}
