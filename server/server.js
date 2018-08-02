const express = require('express');
const bodyParser = require('body-parser');


const port = 7913;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const transactions = [];

console.log('hey i\'m a server');
app.use(express.static('tempclient'));
app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('/test',(req, res) => {
	io.emit('transaction', {key:'value'});
	res.end();
})

app.post('/results', (req, res) => {
	console.log('hit results route');
	if (req.body instanceof Array) {
		transactions.push(...req.body);
	} else {
		transactions.push(req.body);
	}
	io.emit('transaction', req.body);
	io.emit('test', 'hello');
	res.end();
})
io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('transaction', transactions);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(port);
