import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Register from './Register';

const Account = () => {
  const user = { fullName: "Chad Bro" };

  return (
    <main>
      <header>
        <h2>{user ? { user } : 'Login'}</h2>
      </header>

      <Switch>
        <Route path="/account/login" component={Login} />
        <Route path="/history" />
        <Route path="/account/register" component={Register}/>
      </Switch>
    </main>
  );
};

export default Account;
