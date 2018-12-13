import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Navbar } from './components';
import 'bulma/css/bulma.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Navbar />
        <header className="App__header">
          <h1 className="App__header__title">Moth Balls</h1>
        </header>
      </div>
    );
  }
}

export default App;
