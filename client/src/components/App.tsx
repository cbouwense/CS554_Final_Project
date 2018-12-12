import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Account from './pages/Account';
import Home from './pages/Home';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__header__title">Moth Balls</h1>
          <Link to="/account/login">Login</Link>
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
