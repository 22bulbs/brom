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
app.locals.io = io;

if (PLAIN) {
  console.log('using temp client', PLAIN);
  app.use(express.static('tempclient'));
} else {
  console.log('using real client', PLAIN);
  app.use(express.static('public'));
  app.use(express.static('dist'));
}

app.use(bodyParser.json());

app.post('/results',
  handleResults
);

io.on('connection', (socket) => {
  socket.emit('transaction', transactions);
});

server.listen(PORT);