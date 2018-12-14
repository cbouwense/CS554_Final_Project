import { connect } from 'react-redux';
import ExerciseEventList from './ExerciseEventList';

const mapStateToProps = state => {
  const { exercises } = state.auth;

  return { exercises };
};

const ExerciseList = connect(mapStateToProps)(ExerciseEventList);

export default ExerciseList;
