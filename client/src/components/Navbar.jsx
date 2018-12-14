import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../redux/actions';

class Navbar extends React.Component {
  state = {
    burgerOpen: false
  };

  logout = () => {
    this.props.logoutUser();
    this.props.history.push('/account/login');
  };

  render() {
    const { user } = this.props;

    return (
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-item">
            <b>Mothballs</b>
          </NavLink>
          <NavLink className="navbar-item" to="/exerciseInfo">
            Exercise Examples
          </NavLink>
          {user && (
            <NavLink className="navbar-item" to="/exerciseEvents/new">
              Log Exercise
            </NavLink>
          )}

          <a
            role="button"
            className={`navbar-burger burger ${this.state.burgerOpen &&
              'is-active'}`}
            onClick={() =>
              this.setState(state => ({ burgerOpen: !state.burgerOpen }))
            }
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div className={`navbar-menu ${this.state.burgerOpen && 'is-active'}`} id="navbar">
          <div className="navbar-end">
            {user._id
            ? <>
                <a className="navbar-item" onClick={this.logout}>Logout {user.username}</a>
              <NavLink className="navbar-item" to="/account/profile"><img src={user.profile_image} alt="profile" /></Link>
              </>
            : <>
                <NavLink to="/account/login" className="navbar-item">Login</NavLink>
                <NavLink to="/account/register" className="navbar-item">Register</NavLink>
              </>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(
  connect(
    state => ({ user: state.auth.user }),
    { logoutUser }
  )(Navbar)
);
