import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions';
import get from 'lodash/get';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null
    };
  }

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    console.log(this.props.loginUser(this.state.username, this.state.password));
  };

  render() {
    const { username, password } = this.state;

    return <>
      {this.props.error &&
      <p className="notification is-danger">{this.props.error}</p>}
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </label>

        <label>
          <button type="submit" value="submit">Submit</button>
        </label>
      </form>
    </>;
  }
}

export default connect(
  state => ({ error: get(state, 'user.error') }),
  { loginUser }
)(Login);
