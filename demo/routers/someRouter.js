const express = require('express');
const nestedRouter = require('./nestedRouter');

const someRouter = express.Router();

someRouter.patch('/', (req, res) => {
  res.send('express.Router is tracked as well!');
});

someRouter.use('/nested', nestedRouter);

module.exports = someRouter;
