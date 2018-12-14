import { connect } from 'react-redux';
import ExerciseEventList from './ExerciseEventList';

const mapStateToProps = state => {
  const { user } = state.auth;

  // Get the exercise event list from the db

  return { exercises: user.exerciseEvents };
};

const ExerciseList = connect(mapStateToProps)(ExerciseEventList);

export default ExerciseList;
