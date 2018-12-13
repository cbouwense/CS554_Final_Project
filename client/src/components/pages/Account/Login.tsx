import React from 'react';
import axois from 'axios';

interface ILoginState {
  username: string;
  password: string;
  error: string | null;
}

type LoginStateSetter = Pick<ILoginState, 'username' | 'password'>;

export class Login extends React.Component<{}, ILoginState> {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null
    };
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.currentTarget;

    this.setState({ [name]: value } as LoginStateSetter);
  };

  public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await axois.post('/api/user/login', {
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

  public render() {
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
