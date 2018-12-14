import { connect } from 'react-redux';
import ExerciseInfoList from './ExerciseInfoList';

const ExerciseInfoListContainer = connect(state => ({
  exerciseList: state.exercises
}))(ExerciseInfoList);

export default ExerciseInfoListContainer;
