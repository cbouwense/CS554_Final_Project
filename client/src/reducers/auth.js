import initialState from '../store/initialState';
import {
  USER_LOGIN_SUCCESS,
  USER_SESSION_RESUME,
  USER_LOGOUT
} from '../actions/actionTypes';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.data };
    case USER_SESSION_RESUME:
      return { ...state, user: action.data };
    case USER_LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}
