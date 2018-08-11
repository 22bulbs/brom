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

const transactions = [];
const runtimeStamp = timestamp();

app.locals.transactions = transactions;
app.locals.globalData = {};
app.locals.io = io;

const makeStatic = dir =>
  express.static(path.resolve(__dirname, '../..', dir));

if (PLAIN) {
  console.log('using temp client', PLAIN);
  app.use(makeStatic('tempclient'));
} else {
  console.log('using real client', PLAIN);
  app.use(makeStatic('public'));
  app.use(makeStatic('dist'));
}

app.use(bodyParser.json());

app.post('/results',
  handleResults
);

io.on('connection', (socket) => {
  socket.emit('transaction', transactions);
  socket.emit('globaldata', app.locals.globalData)
});

server.listen(PORT);
