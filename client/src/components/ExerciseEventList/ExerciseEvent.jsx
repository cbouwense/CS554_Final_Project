import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteExerciseEvent } from '../../actions';
import moment from 'moment';

const ExerciseEvent = ({
  exercise: { _id, exercise, timestamp, weight, sets, reps },
  deleteExerciseEvent,
  toggleEdit
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <Link to={`/exerciseInfo#${exercise.name.replace(/\s/g, '')}`}>
              <p className="title is-4">{exercise.name}</p>
            </Link>
          </div>
        </div>

        <div className="content">
          {weight && <p>{weight} pounds</p>}
          {sets && <p>{sets} sets</p>}
          {reps && <p>{reps} reps</p>}
          <br />
          <time dateTime={timestamp}>{moment(timestamp).fromNow()}</time>
        </div>

        <button onClick={() => deleteExerciseEvent({ _id })}>Delete</button>
        <button onClick={toggleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default connect(
  null,
  { deleteExerciseEvent }
)(ExerciseEvent);
