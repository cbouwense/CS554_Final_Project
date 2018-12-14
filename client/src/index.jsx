import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
