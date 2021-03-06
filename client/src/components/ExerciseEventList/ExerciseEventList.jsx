import React from 'react';
import ExerciseEvent from './ExerciseEvent';
import ExerciseEventEdit from './ExerciseEventEdit';

class ExerciseEventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: this.props.exerciseList.map(e => false)
    };
  }

  toggleEdit = i => () => {
    this.setState({
      editing: this.state.editing.map((e, j) => j === i ? !e : e)
    });
  };

  render() {
    const { exerciseList } = this.props;

    return (
      <div>
        <ul>
          {exerciseList.map((e, i) => {
            const toggleEdit = this.toggleEdit(i).bind(this);

            return (
              <li key={e._id}>
                {this.state.editing[i] ? (
                  <ExerciseEventEdit toggleEdit={toggleEdit} exercise={e} />
                ) : (
                  <ExerciseEvent toggleEdit={toggleEdit} exercise={e} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ExerciseEventList;
