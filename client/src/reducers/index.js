import { combineReducers } from 'redux';
import auth from './auth';
import exercises from './exercises';
import exerciseEvents from './exerciseEvents';

export const rootReducer = combineReducers({
  auth,
  exercises,
  exerciseEvents,
});
