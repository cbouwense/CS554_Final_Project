import axios from 'axios';
import { GOT_EXERCISES } from './actionTypes';

export function getExercises() {
  return async dispatch => {
    try {
      const res = await axios.get('http://localhost:4000/api/exercise')
      dispatch({
        type: GOT_EXERCISES,
        data: res.data
      })
    } catch (err) {
      if (err.response)
        throw new Error(err.response.data.message)
      else
        throw err
    }
  }
}
