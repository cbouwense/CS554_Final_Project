import initialState from '../store/initialState';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from '../actions';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.data, error: null }
    case USER_LOGIN_FAILURE:
      return { ...state, user: null, error: action.data.message }
    case USER_LOGOUT:
      return { ...state, user: null, error: null }
    default:
      return state
  }
}
