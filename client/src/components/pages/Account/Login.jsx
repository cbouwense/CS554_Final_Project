import React from 'react';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // TODO Login backend
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
