import * as React from "react";
import { Route, Switch } from "react-router";
import Account from "./pages/Account";
import Home from "./pages/Home";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__header__title">Moth Balls</h1>
        </header>

        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/account" component={Account} />
        </Switch>
      </div>
    );
  }
}

export default App;
