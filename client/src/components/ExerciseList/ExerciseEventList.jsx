import React from 'react';
import axios from 'axios';

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

export default ExercistEventList;
