import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./App.js";
import store from './client/store';

console.log('hello!');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById("root")
);
