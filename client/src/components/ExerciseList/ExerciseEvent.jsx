import React from 'react';

export const ExerciseEvent = props => {
  let fieldsToRender = [];
  if (props.event.weight) {
    fieldsToRender.append(<p>{props.event.weight} pounds</p>);
  }
  if (props.event.sets) {
    fieldsToRender.append(<p>{props.event.sets} sets</p>);
  }
  if (props.event.reps) {
    fieldsToRender.append(<p>{props.event.reps} reps</p>);
  }

  console.log(`fieldsToRender: `);
  console.log(fieldsToRender);

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{props.event.exercise.name}</p>
          </div>
        </div>

        <div className="content">
          {fieldsToRender.map(f => f)}
          <br />
          <time dateTime={props.exercise.timestamp}>
            {props.exercise.timestamp}
          </time>
        </div>
      </div>
    </div>
  );
};
