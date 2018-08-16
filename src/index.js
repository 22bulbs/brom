import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./App.js";
import store from './client/store';
import io from 'socket.io-client';
import { addTransaction, updateGlobalData, setSocketStatus } from "./client/actions/actions.js";
import { sampleData } from "../sampleData.js";

console.log('hello!');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// uncomment the following line when not testing the back end
// store.dispatch(addTransaction(sampleData));
// store.dispatch(updateGlobalData({
//   ports: {
//     app: 3000,
//     proxy: 9999,
//     results: 7913,
//   },
//   title: 'demo title',
//   protocol: 'http',
//   methods: {
//     GET: 55,
//     POST: 23,
//     DELETE: 10,
//     PUT: 33,
//     PATCH: 17,
//     JOKE: 13,
//     HAHA: 1,
//     LITTLEMORE: 4
//   },
//   totals: {
//     transactions: 59,
//     severe: 12,
//     deprecated: 3,
//     conflicting: 1,
//     redundant: 0,
//     internal: 29,
//     external: 30
//   }
// }));

// uncomment the following block for use with backend and web sockets

const socket = io();
socket.on('connect', () => {
  store.dispatch(setSocketStatus(socket.connected));
});
socket.on('transaction', (transaction) => {
  store.dispatch(addTransaction(transaction));
});
socket.on('globaldata', (globaldata) => {
  store.dispatch(updateGlobalData(globaldata));
});
socket.on('disconnect', () => {
  store.dispatch(setSocketStatus(socket.connected));
});
