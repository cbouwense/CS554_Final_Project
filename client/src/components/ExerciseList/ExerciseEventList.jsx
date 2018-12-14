import React from 'react';
import { ExerciseEvent } from './ExerciseEvent';

export const ExerciseEventList = ({ exerciseList }) => (
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
