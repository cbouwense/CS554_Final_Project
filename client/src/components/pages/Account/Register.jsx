import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmedPassword: '',
            error: null
        };
    }

    handleChange = (event) => {
        event.preventDefault();

        const { name, value } = event.currentTarget;

        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
      event.preventDefault()

      const { username, password, confirmedPassword } = this.state;

      if (password !== confirmedPassword)
        return this.setState({
          error: 'passwords do not match'
        })

      try {
        await this.props.registerUser(username, password)
        this.props.history.push('/')
      } catch (err) {
        this.setState({
          error: err.message
        })
      }
    }

    render() {
        const { username, password, confirmedPassword } = this.state;

        return <>
          {this.state.error &&
          <p className="notification is-danger">{this.state.error}</p>}
          <form onSubmit={this.handleSubmit}>
              <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    required
                  />
              </label>

              <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
              </label>

              <label>
                  Confirm Password:
                  <input
                    type="password"
                    name="confirmedPassword"
                    value={confirmedPassword}
                    onChange={this.handleChange}
                    required
                  />
              </label>
              <input type="submit" value="Register" />
          </form>
        </>
    }
}

export default connect(
  state => ({ error: state.auth.error }),
  { registerUser }
)(Register);
