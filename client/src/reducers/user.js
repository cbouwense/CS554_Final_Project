import { initialState } from '../store';
import { USER_LOGGED_IN, USER_LOGIN_FAILURE } from '../actions';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, user: action.data, error: null }
    case USER_LOGIN_FAILURE:
      return { ...state, user: null, error: action.data.message }
    default:
      return state
  }
}
