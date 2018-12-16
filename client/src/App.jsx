import * as React from 'react';
import { Navbar } from './components';
import { connect } from 'react-redux';
import { checkSession, getExercises } from './actions';
import { withRouter } from 'react-router';
import 'bulma/css/bulma.css';

class App extends React.Component {
  componentDidMount() {
    this.props.getExercises()
    this.props.checkSession()
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

export default withRouter(
  connect(
    null,
    { checkSession, getExercises }
  )(App)
);
