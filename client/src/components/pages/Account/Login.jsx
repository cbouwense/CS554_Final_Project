import React from 'react';
import axios from 'axios';

export class Login extends React.Component {
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

    try {
      const res = await axios.post('/api/user/login', {
        username: this.state.username,
        password: this.state.password
      });

      console.log(`Logged in ${res.data._id}, ${res.data.username}`);
    } catch (err) {
      this.setState({
        username: '',
        password: '',
        error: err.response.data.message
      });
    }
  };

  render() {
    const { username, password } = this.state;

    return (
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
    );
  }
}
