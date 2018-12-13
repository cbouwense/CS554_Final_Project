import * as React from 'react';

interface ILoginProps {
  [key: string]: any;
}

interface ILoginState {
  username: string;
  password: string;
}

type LoginStateSetter = Pick<ILoginState, 'username' | 'password'>;

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.currentTarget;

    this.setState({ [name]: value } as LoginStateSetter);
  };

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO Login backend
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

export default Login;
