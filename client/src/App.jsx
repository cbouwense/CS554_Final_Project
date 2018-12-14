import * as React from 'react';
import { Navbar } from './components';
import 'bulma/css/bulma.css';

class App extends React.Component {
  render() {
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