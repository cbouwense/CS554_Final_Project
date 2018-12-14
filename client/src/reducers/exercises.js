import initialState from "../store/initialState";
import { GOT_EXERCISES } from "../actions";

export default function exercisesReducer(state = initialState.exerciseEvents, action) {
  switch (action.type) {
    case GOT_EXERCISES:
      return action.data
    default:
      return state
  }
}
