import initialState from "../store/initialState";
import { EXERCISE_EVENT_CREATED } from "../actions";

export default function exerciseEventsReducer(state = initialState.exerciseEvents, action) {
  switch (action.type) {
    case EXERCISE_EVENT_CREATED:
      return [...state, action.data]
    default:
      return state
  }
}
