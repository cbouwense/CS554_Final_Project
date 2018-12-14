import React from 'react';

const ExerciseEvent = ({ exercise: { name, timestamp, weight, sets, reps }}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{name}</p>
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
