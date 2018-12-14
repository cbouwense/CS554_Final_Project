import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseEvent = ({
  exercise: { exercise, timestamp, weight, sets, reps }
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            {/* ? I do not know how to actually make this go to the #anchor */}
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
          <time dateTime={timestamp}>{timestamp}</time>
        </div>
      </div>
    </div>
  );
};

export default ExerciseEvent;
