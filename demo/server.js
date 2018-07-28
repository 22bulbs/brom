/* eslint no-console: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
const express = require('express');
const request = require('request');

const someController = require('./controllers/someController');
const someRouter = require('./routers/someRouter');

const app = express();

app.use('/routers', someRouter);

app.get('/', (req, res, next) => next());
app.get('/', someController.setCookie, (req, res) => {
  res.send("Here's the home page!");
});
app.post('/', (req, res) => {
  res.send("Don't post here!");
});
app.post('/login', someController.verifyUser, someController.login);

const signup = express.Router();
app.use('/signup', signup);

signup.get('/', (req, res) => {
  res.end('Gotten!');
});
signup.post('/', someController.createUser, someController.login);

app.route('/secret').get(someController.isLoggedIn, (req, res) => {
  res.send("Here's the secret page!");
});

app.listen(3000);

module.exports = app;
