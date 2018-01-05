import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import rootReducers from './reducers';
import App from './routes/App';
import registerServiceWorker from './registerServiceWorker';

const appRoot = document.getElementById('root');

ReactDOM.render(
  <Provider store={rootReducers}>
    <App />
  </Provider>, appRoot);

registerServiceWorker();
