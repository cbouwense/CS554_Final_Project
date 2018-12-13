import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Register from './Register';

const Account = () => {
  const user = { fullName: "Chad Bro" };

  return (
    <main>
      <header>
        <h1>{user.fullName}</h1>
      </header>

      <Switch>
        <Route path="/history" />
        <Route path="/account/register" component={Register}/>
      </Switch>
    </main>
  );
};

export default Account;
