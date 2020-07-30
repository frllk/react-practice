import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-dom'
import store from './store'

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <App />,
  document.getElementById('root')
);
