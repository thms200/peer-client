import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Appcontainer from './containers/Appcontainer';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Appcontainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
