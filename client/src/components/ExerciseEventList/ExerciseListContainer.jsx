import { connect } from 'react-redux';
import ExerciseEventList from './ExerciseEventList';

const ExerciseEventListContainer = connect(state => ({
  exerciseList: state.exerciseEvents
}))(ExerciseEventList);

export default ExerciseEventListContainer;
