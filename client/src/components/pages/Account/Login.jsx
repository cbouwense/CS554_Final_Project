import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null
    };
  }

  handleChange = event => {
    event.preventDefault();

    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      await this.props.loginUser(this.state.username, this.state.password);
      this.props.history.push('/');
    } catch (err) {
      this.setState({
        username: '',
        password: '',
        error: err.message
      });
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <>
        {this.state.error && (
          <p className="notification is-danger">{this.state.error}</p>
        )}

        <div className="container">
          <form onSubmit={this.handleSubmit}>

            <div className="field">
              <label className="label">
                Username:
                  <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                </div>
              </label>
            </div>

            <div className="field">
              <label className="label">
                Password:
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
              </label>
            </div>

            <div className="field">
              <input type="submit" value="Login" className="button" />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default connect(
  null,
  { loginUser }
)(Login);
