import * as React from 'react';
import { Navbar } from './components';
import { connect } from 'react-redux';
import { getExercises } from './actions';
import 'bulma/css/bulma.css';

class App extends React.Component {
  componentDidMount() {
    this.props.getExercises()
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getExercises }
)(App);
