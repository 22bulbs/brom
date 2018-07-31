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
  res.cookie('bad', 'true');
  res.send("Don't post here!");
});
app.post('/login', someController.verifyUser, someController.login);

const signup = express.Router();
app.use('/signup', signup);

signup.get('/', (req, res) => {
  res.set('Content-Security-Policy', "default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com");
  res.end('Gotten!');
});
signup.post('/', someController.createUser, someController.login);

app.route('/secret').get(someController.isLoggedIn, (req, res) => {
  res.set('Feature-Policy', 'camera https://other.com; microphone https://other.com');
  res.send("Here's the secret page!");
});
app.route('/secret/:id').get((req, res) => {
  res.send('Params are tracked too!');
});

app.listen(3000);

module.exports = app;
