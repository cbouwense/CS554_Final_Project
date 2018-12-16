import React from 'react';
import { connect } from 'react-redux';
import { updateExerciseEvent } from '../../actions';
import moment from 'moment';

class ExerciseEventEdit extends React.Component {
  constructor(props) {
    super(props);

    const {
      exercise: { exercise, timestamp, weight, sets, reps }
    } = props;

    this.state = {
      exerciseId: exercise._id,
      timestamp: moment(timestamp).format('YYYY-MM-DDTHH:mm'),
      weight,
      sets,
      reps,
      error: null
    };
  }

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
      await this.props.updateExerciseEvent({
        _id: this.props.exercise._id,
        exerciseId,
        timestamp,
        weight,
        sets,
        reps
      });

      this.props.toggleEdit();
    } catch (err) {
      this.setState({ error: err.message });
      throw err;
    }
  };

  render() {
    const { exercises, toggleEdit } = this.props;

    // If I were to get good I'd make some reusable components
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="card">
          <div className="card-content">
            {this.state.error && <p className="notification is-danger">{this.state.error}</p>}
            <div className="media">
              <div className="media-content">
                <div className="field">
                  <label className="label">
                    Exercise
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
                          {exercises.map((e, i) => (
                            <option value={e._id} key={e._id}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="content">
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
            </div>

            <label>
              <button onClick={toggleEdit}>Cancel</button>
            </label>

            <label>
              <button type="submit" value="submit">
                Done
              </button>
            </label>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(
  state => ({
    exercises: state.exercises
  }),
  { updateExerciseEvent }
)(ExerciseEventEdit);
