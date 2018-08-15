/* eslint no-console: 0 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { timestamp } = require('../utils/utils');
const handleResults = require('./handle-results');

const PORT = process.env.BROM_RESULTS_PORT;
const PLAIN = process.env.BROM_PLAIN_GUI;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let globalData = {};
let transactions = [];

if (process.env.BROM_READ_DESTINATION) {
  console.log('Reading from file at ', process.env.BROM_READ_DESTINATION);
  const data = JSON.parse(fs.readFileSync(process.env.BROM_READ_DESTINATION))
  globalData = data.globalData;
  transactions = data.transactions;
}

const runtimeStamp = timestamp();

app.locals.transactions = transactions;
app.locals.globalData = globalData;
app.locals.io = io;
app.locals.runtime = runtimeStamp;

const makeStatic = dir =>
  express.static(path.resolve(__dirname, '../..', dir));

if (PLAIN) {
  console.log('Using plaintext client');
  app.use(makeStatic('plainclient'));
} else {
  console.log('Using full client');
  app.use(makeStatic('public'));
  app.use(makeStatic('dist'));
}

app.use(bodyParser.json());

app.post('/results',
  handleResults
);

io.on('connection', (socket) => {
  socket.emit('transaction', transactions);
  socket.emit('globaldata', globalData)
});

server.listen(PORT);
