import * as React from "react";
import { Route, Switch } from "react-router-dom";

const Account = () => {
  const user = { fullName: "Chad Bro" };

  return (
    <main>
      <header>
        <h1>{user.fullName}</h1>
      </header>

      <Switch>
        <Route path="/history" />
      </Switch>
    </main>
  );
};

export default Account;
