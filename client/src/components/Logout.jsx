import React from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { logoutUser } from '../actions';

class Logout extends React.Component {
  logout = () => {
    const { cookies, logoutUser, history } = this.props;

    const sID = cookies.get('sID');

    if (sID) {
      logoutUser(sID);
      cookies.remove('sID');
      console.log(`Ended session: ${sID}`);
    } else {
      console.log('No sID found on logout');
    }

    history.push('/account/login');
  };

  render() {
    return (
      <a className="navbar-item" onClick={this.logout}>
        Logout {this.props.user.username}
      </a>
    );
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  { logoutUser }
)(withCookies(Logout));
