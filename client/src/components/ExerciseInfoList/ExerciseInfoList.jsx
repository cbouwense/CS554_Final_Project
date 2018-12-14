import React from 'react';
import ExerciseInfo from './ExerciseInfo';

const ExerciseInfoList = ({ exerciseList }) => {
  return (
    <main>
      <div>
        <ul>
          {exerciseList.map(e => (
            <li key={e._id}>
              <a href={`#${e.name.replace(/\s/g, '')}`}>{e.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {exerciseList.map(e => (
            <li key={e._id}>
              <ExerciseInfo exercise={e} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ExerciseInfoList;
