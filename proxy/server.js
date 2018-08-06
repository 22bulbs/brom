// this is the server that the spy script redirects to

const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');
const axios = require('axios');
const escapeHTML = require('escape-html');

const spyController = require('./spyController');
const makeScriptInjector = require('./make-script-injector');

const app = express();
const PORT = 9999;

app.use(cookieParser());

app.post('/p4bcxeq3jgp2jvsx2tobdhs7',
  bodyparser.json(),
  spyController.report,
  spyController.redirect,
  spyController.generateTransaction,
  spyController.postTransaction,
  spyController.respond
);

app.use('/', proxy)

app.listen(PORT, () => console.log(`Visit your page at http://localhost:${PORT}`));

function proxy(req, res, next) {
  let reqBody = '';
  let resBody = '';
  const url = `http://localhost:${process.env.WEBHEAD_USER_PORT}${req.url}`;

  req.on('data', (chunk) => {
    reqBody += chunk;
  });
  req.on('end', () => {
    // console.log(reqBody);
  });
  if (!process.env.WEBHEAD_PRESERVE_CACHING) {
    delete req.headers['if-none-match'];
    delete req.headers['if-modified-since'];
  }
  const data = req.pipe(request(url).on('response', (response) => {
    const injector = makeScriptInjector();

    response.on('data', (chunk) => {
      resBody += chunk;
    });

    response.on('end', () => {
      // console.log(response.headers, resBody);
      let transaction;
      if (response.headers['content-type'].match('text/html')) {
        transaction = makeRawTransaction(req, reqBody, response, escapeHTML(resBody));
      } else {
        transaction = makeRawTransaction(req, reqBody, response, resBody);
      }
      axios.post('http://localhost:7913/results', transaction)
        .then(() => next())
        .catch(error => console.log(error));
    })
    if (response.headers['content-type'].match('text/html')) {
      data.pipe(injector).pipe(res);
    } else {
      data.pipe(res);
    }
  }));
}

function makeRawTransaction(req, reqBody, res, resBody) {
  return {
    metadata: {
      url: req.url,
      method: req.method,
      api: '',
      external: false,
    },
    request: {
      headers: req.headers,
      body: reqBody,
    },
    response: {
      statusCode: res.status,
      headers: res.headers,
      body: resBody
    }
  };
}
