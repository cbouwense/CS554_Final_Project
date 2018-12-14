import initialState from "../store/initialState";
import { EXERCISE_EVENT_CREATED, USER_LOGIN_SUCCESS } from "../actions";

export default function exerciseEventsReducer(state = initialState.exerciseEvents, action) {
  switch (action.type) {
    case EXERCISE_EVENT_CREATED:
      return [...state, action.data]
    case USER_LOGIN_SUCCESS:
      return action.data.exerciseEvents || null
    default:
      return state
  }
}
