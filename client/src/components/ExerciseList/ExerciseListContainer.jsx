import { connect } from 'react-redux';
import ExerciseEventList from './ExerciseEventList';

const mapStateToProps = state => {
  const { user } = state.auth;

  return { exercises: user ? user.exerciseEvents : [] };
};

const ExerciseList = connect(mapStateToProps)(ExerciseEventList);

export default ExerciseList;
