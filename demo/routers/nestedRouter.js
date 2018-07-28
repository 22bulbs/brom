const express = require('express');
const request = require('request');

const nestedRouter = express.Router();
nestedRouter.delete('/', (req, res) => {
  request.get('http://google.com', (error) => {
    if (error) {
      return res.end("Something failed here, but we're still tracking it!");
    }
    return res.end('Yup, tracking nested routers!');
  });
});

module.exports = nestedRouter;
