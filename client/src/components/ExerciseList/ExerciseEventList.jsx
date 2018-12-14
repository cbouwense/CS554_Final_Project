import React from 'react';
import { ExerciseEvent } from './ExerciseEvent';

const ExerciseEventList = ({ exerciseList }) => (
  <div>
    <ul>
      {exerciseList.map(e => (
        <li>
          <ExerciseEvent exercise={e} />
        </li>
      ))}
    </ul>
  </div>
);

export default ExerciseEventList;
