import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppRouter} from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppRouter />
  , document.getElementById('root'),
);
registerServiceWorker();
