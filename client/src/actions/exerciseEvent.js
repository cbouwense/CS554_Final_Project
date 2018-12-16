import axios from 'axios';
import {
  EXERCISE_EVENT_CREATED,
  EXERCISE_EVENT_DELETED,
  EXERCISE_EVENT_UPDATED
} from './actionTypes';

export function createExerciseEvent({ exerciseId, userId, timestamp, weight, sets, reps }) {
  return async dispatch => {
    try {
      const res = await axios.post('/api/exerciseEvent', {
        exerciseId,
        userId,
        timestamp,
        weight,
        sets,
        reps
      });
      dispatch({
        type: EXERCISE_EVENT_CREATED,
        data: res.data
      });
    } catch (err) {
      if (err.response) throw new Error(err.response.data.message);
      else throw err;
    }
  };
}

export function updateExerciseEvent(exerciseEvent) {
  return async dispatch => {
    try {
      const res = await axios.patch(`/api/exerciseEvent/${exerciseEvent._id}`, exerciseEvent);
      dispatch({
        type: EXERCISE_EVENT_UPDATED,
        data: res.data
      });
    } catch (err) {
      if (err.response) throw new Error(err.response.data.message);
      else throw err;
    }
  };
}

export function deleteExerciseEvent({ _id }) {
  return async dispatch => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/exerciseEvent/${_id}`);
      dispatch({
        type: EXERCISE_EVENT_DELETED,
        data: res.data
      });
    } catch (err) {
      if (err.response) throw new Error(err.response.data.message);
      else throw err;
    }
  };
}
