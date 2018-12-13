import React from 'react';

export class Register extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            confirmedPassword: ''
        };
    }

    handleChange = (event) => {
        event.preventDefault();

        const { name, value } = event.currentTarget;

        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {

    }

    render() {
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

