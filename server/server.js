/* eslint no-console: 0 */
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');


const PORT = process.env.WEBHEAD_RESULTS_PORT;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const transactions = [];

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(bodyParser.json());

app.post('/results', (req, res) => {
  console.log('received results');
  const newTransactions = [].concat(req.body);
  transactions.push(...newTransactions);

  io.emit('transaction', newTransactions);

  const destination = process.env.WEBHEAD_WRITE_DESTINATION;
  if (destination) {
    fs.writeFile(destination, JSON.stringify(transactions, null, 2), (err) => {
      if (err) {
        console.error(`Failed to write results to ${destination}`);
        console.error(err);
        return;
      }
      console.log(`Wrote results to ${destination}`);
    });
  }

  res.end();
});

io.on('connection', (socket) => {
  socket.emit('transaction', transactions);
});

server.listen(PORT);
