//this is the server that the spy script redirects to

const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request')
const { Transform } = require('stream');
const fs = require('fs');
const axios = require('axios');
const escapeHTML = require('escape-html');

const spyController = require('./spyController');
const spyScript = fs.readFileSync(__dirname + '/spy.js', 'utf8')

const app = express();

// app.use(bodyparser.json());
app.use(cookieParser());

app.post('/p4bcxeq3jgp2jvsx2tobdhs7',
  bodyparser.json(),
  spyController.report,
  spyController.redirect,
  spyController.generateTransaction,
  spyController.postTransaction,
  spyController.respond
)

app.use('/', proxy)

function makeTransform() {
  return new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      console.log('calling transform stream');
      if (chunk.toString().match('<head>')) {
        chunk = chunk.toString().replace('<head>', `<head><script type="text/javascript">${spyScript}</script>`);
        chunk = Buffer.from(chunk, 'utf8');
      }
      return callback(null, chunk);
    },
    flush(callback) {
      this.push(Buffer.from('\n', 'utf8'));
      callback();
    }
  });
}

console.log('spy running on port 9999');
app.listen(9999);

function proxy(req, res, next) {
  let reqBody = '';
  let resBody = '';
  const url = `http://localhost:${process.env.WEBHEAD_USER_PORT}${req.url}`;

  req.on('data', chunk => {
    reqBody += chunk;
  })
  req.on('end', () => {
    // console.log(reqBody);
  })
  if (!process.env.WEBHEAD_PRESERVE_CACHING) {
    delete req.headers['if-none-match'];
    delete req.headers['if-modified-since']
  }
  let data = req.pipe(request(url).on('response', response => {
    const printHello = makeTransform();
    response.on('data', chunk => {
      resBody += chunk;
    })
    response.on('end', () => {
      // console.log(response.headers, resBody);
      let transaction;
      if (response.headers['content-type'].match('text/html')) {
        transaction = makeRawTransaction(req, reqBody, response, escapeHTML(resBody));
      } else {
        transaction = makeRawTransaction(req, reqBody, response, resBody);
      }
      axios.post('http://localhost:7913/results', transaction)
      .then(response => {
      next()
      })
      .catch(error => console.log(error))
    })
    if (response.headers['content-type'].match('text/html')) {
      console.log('yes html');
      data.pipe(printHello).pipe(res);
    } else {
      console.log('no html');
      data.pipe(res);
    }
  }));

}

function makeRawTransaction(req, reqBody, res, resBody) {
  return transaction = {
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
  }
}