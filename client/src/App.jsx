import * as React from 'react';
import { Navbar } from './components';
import 'bulma/css/bulma.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
