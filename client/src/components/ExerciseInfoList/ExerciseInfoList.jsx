import React from 'react';
import ExerciseInfo from './ExerciseInfo';

const ExerciseInfoList = ({ exerciseList }) => {
  return (
    <main>
      <div>
        <ul>
          {exerciseList.map(exercise => (
            <li key={`${exercise._id}`}>
              <a href={`#${exercise.name.replace(/\s/g, '')}`}>
                {exercise.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {exerciseList.map(exercise => (
            <li key={`${exercise._id}`}>
              <ExerciseInfo exercise={exercise} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ExerciseInfoList;
