import initialState from '../store/initialState';
import {
  EXERCISE_EVENT_CREATED,
  EXERCISE_EVENT_DELETED,
  EXERCISE_EVENT_UPDATED,
  USER_LOGIN_SUCCESS,
} from '../actions';

export default function exerciseEventsReducer(state = initialState.exerciseEvents, action) {
  switch (action.type) {
    case EXERCISE_EVENT_CREATED:
      return [...state, action.data];
    case EXERCISE_EVENT_UPDATED:
      return state.map(e =>
        e._id === action.data._id
        ? action.data
        : e
      );
    case EXERCISE_EVENT_DELETED:
      return state.filter(exerciseEvent => exerciseEvent._id !== action.data._id);
    case USER_LOGIN_SUCCESS:
      return action.data.exerciseEvents || state
    default:
      return state;
  }
}
