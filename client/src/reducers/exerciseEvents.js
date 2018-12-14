import initialState from '../store/initialState';
import {
  EXERCISE_EVENT_CREATED,
  USER_LOGIN_SUCCESS,
  EXERCISE_EVENT_DELETED
} from '../actions';

export default function exerciseEventsReducer(state = initialState.exerciseEvents, action) {
  switch (action.type) {
    case EXERCISE_EVENT_CREATED:
      return [...state, action.data];
    case EXERCISE_EVENT_DELETED:
      return state.filter(exerciseEvent =>  exerciseEvent._id !== action.data._id );
    case USER_LOGIN_SUCCESS:
      return action.data.exerciseEvents;
    default:
      return state;
  }
}
