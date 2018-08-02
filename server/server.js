const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');


const port = 7913;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const transactions = [];

app.use(express.static('tempclient'));
app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  io.emit('transaction', { key: 'value' });

  res.end();
});

app.post('/results', (req, res) => {
  if (req.body instanceof Array) {
    transactions.push(...req.body);
  } else {
    transactions.push(req.body);
  }

  io.emit('transaction', req.body);

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
