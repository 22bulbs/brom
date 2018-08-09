/* eslint no-console: 0 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { timestamp } = require('../utils/utils');


const PORT = process.env.BROM_RESULTS_PORT;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const transactions = [];
const runtimeStamp = timestamp();

app.use(express.static('tempclient'));
// app.use(express.static('public'));
// app.use(express.static('dist'));
app.use(bodyParser.json());

app.post('/results', (req, res) => {
  console.log('received results');
  const newTransactions = [].concat(req.body);
  const count = newTransactions.length;
  transactions.push(...newTransactions);

  io.emit('transaction', newTransactions);

  const destination = process.env.BROM_WRITE_DESTINATION;
  if (destination) {
    const fullPath = path.resolve(
      destination,
      `${runtimeStamp}_brom_results.json`
    );

    fs.writeFile(fullPath, JSON.stringify(transactions, null, 2), (err) => {
      if (err) {
        console.error(`Failed to write results to ${destination}`);
        console.error(err);
        return;
      }
      console.log(`Wrote ${count} result${count - 1 ? 's' : ''} to ${destination}`);
    });
  }

  res.end();
});

io.on('connection', (socket) => {
  socket.emit('transaction', transactions);
});

server.listen(PORT);
