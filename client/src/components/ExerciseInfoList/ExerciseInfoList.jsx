import React from 'react';
import ExerciseInfo from './ExerciseInfo';

const ExerciseInfoList = ({ exerciseList }) => {
  const anchorMap = exerciseList.map(exercise => (
    <li key={`Anchor${exercise._id}`}>
      <a href={`#${exercise.name.replace(/\s/g, '')}`}>{exercise.name}</a>
    </li>
  ));

  const infoMap = exerciseList.map(exercise => (
    <li key={`Info${exercise._id}`}>
      <ExerciseInfo exercise={exercise} />
    </li>
  ));

  return (
    <main>
      <div>
        <ul>{anchorMap}</ul>
      </div>

      <div>
        <ul>{infoMap}</ul>
      </div>
    </main>
  );
};

export default ExerciseInfoList;
