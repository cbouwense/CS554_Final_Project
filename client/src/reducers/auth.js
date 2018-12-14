import initialState from '../store/initialState';
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../actions';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.data }
    case USER_LOGOUT:
      return { ...state, user: initialState.auth.user }
    default:
      return state
  }
}
