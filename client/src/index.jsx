import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
registerServiceWorker();
