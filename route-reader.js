/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint import/no-dynamic-require: 0 */

const PORT = process.env.TEST_PORT || 8080;
const logDestination = process.env.TEST_DESTINATION || 'responses.json';

const http = require('http');
const fs = require('fs');
const logger = require('global-request-logger');
const findExpressRoutes = require('./find-express-routes');

// Require in server
console.log(`loading ${process.argv[2]}`);
const app = require(`./${process.argv[2]}`);

// Hang on to non-logging http.request
const nativeRequest = http.request;

// Initialize and configure global-request-logger (and fix http.get)
logger.initialize();
http.get = function get(url, options, cb) {
  const req = http.request(url, options, cb);
  req.end();
  return req;
};
logger.on('success', (req) => {
  console.log(`\tServer successfully requested ${req.href}`);
});
logger.on('error', (req) => {
  console.log(`\tServer failed a request to ${req.href}`);
});

// Parse server's supported routes and methods
console.log('Parsing routes...');
const routes = findExpressRoutes(app._router.stack);
console.log(routes);

console.log(`Starting server on port ${PORT}...`);
http.createServer(app).listen(PORT);

const requests = [];

// Run through every route and fire a request with every attached method
console.log('Firing on all cylinders!');
Object.keys(routes).forEach((path) => {
  routes[path].forEach((method) => {
    requests.push(new Promise((resolve, reject) => {
      nativeRequest({ path, method, port: PORT }, (res) => {
        const { headers, statusCode } = res;

        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          resolve({
            path,
            method,
            headers,
            statusCode,
            body,
          });
        });
      }).on('error', err => reject(err)).end();
    }));
  });
});

// Write all responses from the server to a file
Promise.all(requests).then((responses) => {
  fs.writeFile(logDestination, JSON.stringify(responses, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Wrote to ${logDestination}`);
    }
    process.exit();
  });
}).catch((error) => {
  console.error(error);
  process.exit();
});
