import axios from 'axios';
import { EXERCISE_EVENT_CREATED } from './actionTypes';

export function createExerciseEvent({ exerciseId, userId, timestamp, weight, sets, reps }) {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:4000/api/exerciseEvent', {
        exerciseId,
        userId,
        timestamp,
        weight,
        sets,
        reps
      })
      dispatch({
        type: EXERCISE_EVENT_CREATED,
        data: res.body
      })
    } catch (err) {
      if (err.response)
        throw new Error(err.response.data.message)
      else
        throw err
    }
  }
}
