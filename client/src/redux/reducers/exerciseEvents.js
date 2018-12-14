import initialState from '../store/initialState';
import {
  EXERCISE_EVENT_CREATED,
  USER_LOGIN_SUCCESS,
  EXERCISE_EVENT_DELETED,
  EXERCISE_EVENT_UPDATED
} from '../actions';

export default function exerciseEventsReducer(state = initialState.exerciseEvents, action) {
  switch (action.type) {
    case EXERCISE_EVENT_CREATED:
      return [...state, action.data];
    case EXERCISE_EVENT_UPDATED:
      const i = state.findIndex(e => e._id === action.data._id);
      state.splice(i, 1, action.data);
      return state;
    case EXERCISE_EVENT_DELETED:
      return state.filter(exerciseEvent => exerciseEvent._id !== action.data._id);
    case USER_LOGIN_SUCCESS:
      return action.data.exerciseEvents;
    default:
      return state;
  }
}
