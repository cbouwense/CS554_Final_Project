import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppRouter } from './Router';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
