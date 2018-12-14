import React from 'react';
import ExerciseEvent from './ExerciseEvent';

const ExerciseEventList = ({ exerciseList }) => (
  <div>
    <ul>
      {exerciseList > 0 &&
        exerciseList.map((e, i) => (
          <li key={i}>
            <ExerciseEvent exercise={e} />
          </li>
        ))}
    </ul>
  </div>
);

export default ExerciseEventList;
