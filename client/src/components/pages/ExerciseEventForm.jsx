import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createExerciseEvent } from '../../actions';
import get from 'lodash/get';

class ExerciseEventForm extends React.Component {
  state = {
    exerciseId: '',
    timestamp: '',
    weight: '',
    sets: '',
    reps: '',
    error: null
  };

  handleChange = event => {
    event.preventDefault();

    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    let { exerciseId, timestamp, weight, sets, reps } = this.state;

    if (weight.length > 0 && isNaN(parseInt(weight))) {
      this.setState({ error: 'Invalid weight' });
      return;
    }
    if (sets.length > 0 && isNaN(parseInt(sets))) {
      this.setState({ error: 'Invalid sets' });
      return;
    }
    if (reps.length > 0 && isNaN(parseInt(reps))) {
      this.setState({ error: 'Invalid reps' });
      return;
    }
    if (isNaN(new Date(timestamp).getTime())) {
      this.setState({ error: 'Invalid timestamp' });
      return;
    }

    try {
      await this.props.createExerciseEvent({
        exerciseId,
        userId: this.props.userId,
        timestamp,
        weight,
        sets,
        reps
      });
      this.props.history.push('/');
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    if (!this.props.userId) {
      return <Redirect to="/account/login" />;
    }

    return (
      <>
        {this.state.error && (
          <p className="notification is-danger">{this.state.error}</p>
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Exercise</label>
            <div className="control">
              <div className="select">
                <select
                  name="exerciseId"
                  required
                  value={this.state.exerciseId}
                  onChange={this.handleChange}
                >
                  <option value={''} disabled>
                    Pick an exercise
                  </option>
                  {this.props.exercises.map((e, i) => (
                    <option value={e._id} key={i}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Time</label>
            <div className="control">
              <input
                className="input"
                name="timestamp"
                type="datetime-local"
                required
                value={this.state.timestamp}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Weight</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="weight"
                value={this.state.weight}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Sets</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="sets"
                value={this.state.sets}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Reps</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="reps"
                value={this.state.reps}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="contrl">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default connect(
  state => ({
    exercises: state.exercises,
    userId: get(state.auth.user, '_id')
  }),
  { createExerciseEvent }
)(ExerciseEventForm);
