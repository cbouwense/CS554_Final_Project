import { connect } from 'react-redux';
import ExerciseEventList from './ExerciseEventList';

const ExerciseList = connect(
  state => ({ exerciseList: state.exerciseEvents })
)(ExerciseEventList);

export default ExerciseList;
