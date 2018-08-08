// this is the server that the spy script redirects to
const zlib = require('zlib');
const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');
const axios = require('axios');
const escapeHTML = require('escape-html');
const https = require('https');
const fs = require('fs');
const path = require('path');

const spyController = require('./spyController');
const makeScriptInjector = require('./make-script-injector');

const app = express();
const PORT = process.env.WEBHEAD_PROXY_PORT;
const protocol = process.env.WEBHEAD_USE_HTTPS ? 'https' : 'http';

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

if (process.env.WEBHEAD_USE_HTTPS) {
  const certOptions = {
    key: fs.readFileSync(process.env.WEBHEAD_HTTPS_KEY), // this is bad, fix once config is set up to make this work with any file location
    cert: fs.readFileSync(process.env.WEBHEAD_HTTPS_CERT)
  }
  https.createServer(certOptions, app).listen(PORT);
  console.log(`Proxy running with SSL Encryption. Visit your page at ${protocol}://localhost:${PORT}`);
} else {
  app.listen(PORT, () => console.log(`Proxy running. Visit your page at ${protocol}://localhost:${PORT}`));
}

function proxy(req, res, next) {
  let reqBody = '';
  let resBody = [];
  const requestConfig = {
    url: `${protocol}://localhost:${process.env.WEBHEAD_USER_PORT}${req.url}`,
    rejectUnauthorized: false
  };

  req.on('data', (chunk) => {
    reqBody += chunk;
  });
  if (!process.env.WEBHEAD_PRESERVE_CACHING) {
    delete req.headers['if-none-match'];
    delete req.headers['if-modified-since'];
  }
  const data = req.pipe(request(requestConfig).on('response', (response) => {
    const injector = makeScriptInjector();

    response.on('data', (chunk) => {
      resBody.push(chunk);
    });

    response.on('end', () => {
      let transaction;
      if (response.headers['content-type'].match('text/html')) {
        transaction = makeRawTransaction(req, reqBody, response, resBody);
      } else {
        transaction = makeRawTransaction(req, reqBody, response, resBody);
      }
      axios.post(`http://localhost:${process.env.WEBHEAD_RESULTS_PORT}/results`, transaction)
        .then(() => next())
        .catch(error => console.log(error));
    })
    if (response.headers['content-type'].match('text/html')) {
      delete response.headers['content-length'];
      res.set(response.headers);
      res.status(response.statusCode);
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
      body: escapeHTML(decompress(resBody, res.headers))
    }
  };
}

function decompress(chunks, headers) {
  const buffer = Buffer.concat(chunks)
  if (!headers['content-encoding']) return buffer.toString().slice(0, 5000);
  if (headers['content-encoding'] === 'gzip') return zlib.gunzipSync(buffer).toString().slice(0, 5000);
  if (headers['content-encoding'] === 'deflate') return zlib.inflateSync(buffer).toString().slice(0, 5000);
  return 'none of these worked'
}