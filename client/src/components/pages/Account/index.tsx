import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

const Account = () => {
  const user = undefined;

  return (
    <main>
      <header>
        <h2>{user ? { user } : 'Login'}</h2>
      </header>

      <Switch>
        <Route path="/account/login" component={Login} />
        <Route path="/history" />
      </Switch>
    </main>
  );
};

export default Account;
