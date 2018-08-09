import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./App.js";
import store from './client/store';
import { addTransaction } from "./client/actions/actions.js";
import { sampleData } from "../sampleData.js";

console.log('hello!');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById("root")
);

// uncomment the following line when not testing the back end 
store.dispatch(addTransaction(sampleData));

// uncomment the following block for use with backend and web sockets
// const socket = io();
// socket.on('transaction', transaction => {
//   console.log('transaction received')
//   store.dispatch(addTransaction(transaction));
// });