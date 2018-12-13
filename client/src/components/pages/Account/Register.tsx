import * as React from 'react';

interface IRegisterProps {
    [key: string]: any,
}

interface IRegisterState {
    username: string;
    password: string;
    confirmedPassword: string;
}

type RegisterStateSetter = Pick<IRegisterState, 'username' | 'password' | 'confirmedPassword'>;

export class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            confirmedPassword: ''
        };
    }

    public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();

        const { name, value } = event.currentTarget;

        this.setState({ [name]: value } as RegisterStateSetter);
    }

    public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    }

    public render() {
        const { username, password, confirmedPassword } = this.state;

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
                    Confirm Password:
                    <input
                      type="password"
                      name="confirmedPassword"
                      value={confirmedPassword}
                      onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

