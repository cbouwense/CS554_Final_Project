import React from 'react';
import axios from 'axios';
import { ExerciseEventList } from './ExerciseEventList';

class ExerciseListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseList: []
    };
  }

  componentDidMount() {
    // TODO: Get the user id from the redux store
    let user_id;

    // Get the exercise event list from the db
    axios
      .get(`/api/${user_id}`)
      .then(user => {
        this.setState({
          exerciseList: user.exerciseEvents
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <ExerciseEventList exerciseList={this.state.exerciseList} />;
  }
}

export default ExerciseListContainer;

import { connect } from 'react-redux';
import ExerciseEventList from './ExerciseEventList';

const mapStateToProps = state => {
  const user_id = state;

    // Get the exercise event list from the db
    const user = axios.get(`/api/${user_id}`);

  return {exercises: user.exerciseEvents};
};

const ExerciseList = connect(mapStateToProps)(ExerciseEventList);

export default ExerciseList;
