import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions';

class Navbar extends React.Component {
  state = {
    burgerOpen: false
  }

  logout = () => {
    this.props.logoutUser()
    this.props.history.push('/account/login')
  }

  render() {
    const { user } = this.props;

    return <nav className="navbar is-primary">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <b>Mothballs</b>
        </Link>

        <a role="button" className={`navbar-burger burger ${this.state.burgerOpen && 'is-active'}`}
          onClick={() => this.setState(state => ({ burgerOpen: !state.burgerOpen }))}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${this.state.burgerOpen && 'is-active'}`} id="navbar">
        <div className="navbar-end">
          {user
          ? <>
              <Link className="navbar-item" to="/exerciseEvents/new">new exercise event</Link>
              <a className="navbar-item" onClick={this.logout}>Logout {user.username}</a>
              <p className="navbar-item"><img src={user.profile_image} alt="profile" /></p>
            </>
          : <>
              <Link to="/account/login" className="navbar-item">Login</Link>
              <Link to="/account/register" className="navbar-item">Register</Link>
            </>}
        </div>
      </div>
    </nav>;
  }
}

export default withRouter(
  connect(
    state => ({ user: state.auth.user }),
    { logoutUser }
  )(Navbar)
)
