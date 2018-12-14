import React from 'react';
import ExercistEventList from './ExerciseEventList';

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
      .catch(err => {
        console.log(error);
      });
  }

  render() {
    return <ExercistEventList exerciseList={this.state.exerciseList} />;
  }
}

export default ExerciseEventList;
