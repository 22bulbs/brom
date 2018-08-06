const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');


const port = 7913;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let transactions = [];

app.use(express.static('tempclient'));
app.use(express.static('dist'));
app.use(bodyParser.json());

app.post('/results', (req, res) => {
  console.log('received results');
  transactions = transactions.concat(req.body);

  io.emit('transaction', req.body);
  io.emit('test', 'hello');

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
  console.log('a user connected');
  socket.emit('transaction', transactions);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port);
