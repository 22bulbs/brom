const request = require('request');
const axios = require('axios');

const transactionGenerator = require('../utils/transactionGenerator');

const spyController = {};

spyController.report = (req, res, next) => {
  res.locals.transaction = {
    metadata: {
      url: req.body.url,
      method: req.body.options.method,
      api: req.body.api,
      external: false,
    },
    request: {
      headers: req.body.options.headers,
      body: req.body.data || '',
    },
    response: {
    },
  };
  next();
};

spyController.redirect = (req, res, next) => {
  const { url } = req.body;
  res.locals.transaction.metadata.external = true;
  // if req contains cookies, send them with the headers to the destination
  if (req.headers.cookie) {
    req.body.options.headers.cookie = req.headers.cookie;
  }
  // configure axios request
  const requestConfig = {
    url,
    method: req.body.options.method,
    headers: req.body.options.headers,
    withCredentials: true,
  };
  // if data is present, include in new request
  if (req.body.data) {
    requestConfig.data = JSON.parse(req.body.data);
  }
  // make request
  axios(requestConfig)
    .then((response) => {
      res.locals.transaction.response.headers = response.headers;
      res.locals.transaction.response.body = response.data;
      res.locals.transaction.response.statusCode = response.status;
      // set all headers from response to destination in response to client
      for (const header in response.headers) {
        res.set(header, response.headers[header]);
      }
      // send response

      next();
    })
    .catch(error => console.log(error));
};


spyController.generateTransaction = (req, res, next) => {
  res.locals.transaction = transactionGenerator(res.locals.transaction);
  next();
};

spyController.postTransaction = (req, res, next) => {
  axios.post('http://localhost:7913/results', res.locals.transaction)
    .then(() => next())
    .catch(error => console.log(error));
};

spyController.respond = (req, res) => {
  res.json(res.locals.transaction.response.body);
};

module.exports = spyController;

