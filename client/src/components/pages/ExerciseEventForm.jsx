import React from 'react';
import { connect } from 'react-redux';
import { createExerciseEvent } from '../../actions'

class ExerciseEventForm extends React.Component {
  state = {
    error: null
  }
  /*
        exerciseId,
        userId,
        timestamp,
        weight,
        sets,
        reps
        */

  render() {
    return <>
      {this.state.error &&
      <p className="notification is-danger">{this.state.error}</p>}

      <form>
        <div className="field">
          <label className="label">Exercise</label>
          <div className="control">
            <select name="exerciseId">
              {this.props.exercises.map((e, i) =>
                <option value={e._id} key={i}>{e.name}</option>
               )}
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Time</label>
          <div className="control">
            <input name="timestamp" type="datetime-local" />
          </div>
        </div>
      </form>
    </>;
  }
}

export default connect(
  state => ({
    exercises: state.exercises
  }),
  { createExerciseEvent }
)(ExerciseEventForm)
