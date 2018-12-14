import * as React from 'react';
import { Navbar } from './components';
import { connect } from 'react-redux';
import { getExercises } from './actions';
import { resumeUserSession } from './actions/auth';
import { withRouter } from 'react-router';
import 'bulma/css/bulma.css';
import { withCookies } from 'react-cookie';

class App extends React.Component {
  componentDidMount() {
    const { user, cookies, getExercises, resumeUserSession } = this.props;

    if (!user) {
      const sID = cookies.get('sID');

      if (sID) {
        resumeUserSession(sID);
      }
    }

    getExercises();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({ user: state.auth.user }),
    { getExercises, resumeUserSession }
  )(withCookies(App))
);
