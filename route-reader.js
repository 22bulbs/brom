/* eslint no-console: 0 */
/* eslint import/no-dynamic-require: 0 */

const PORT = process.env.TEST_PORT || 9998;
const logDestination = process.env.TEST_DESTINATION || 'responses.json';

const http = require('http');
const fs = require('fs');
const findExpressRoutes = require('./find-express-routes');
const addRequestListeners = require('./add-request-listeners');
const requestAll = require('./request-all');
const axios = require('axios');
const { shake } = require('./utils');

// Require in server
console.log(`loading ${process.argv[2]}`);
const app = require(`./${process.argv[2]}`);

// Initialize and configure global-request-logger
const nativeRequest = http.request;
function reqSuccess(req, res) {
  console.log(`INTERNAL: Server successfully requested ${req.href} (${res.statusCode})`);
}

function reqError(req, res) {
  console.log(`INTERNAL: Server failed a request to ${req.href} (${res.statusCode})`);
}

addRequestListeners(reqSuccess, reqError);

// Parse server's supported routes and methods
console.log(`Starting server on port ${PORT}...`);
http.createServer(app).listen(PORT);

const routes = findExpressRoutes(app._router.stack);
const { paramPaths, normalPaths } = shake(Object.keys(routes), {
  paramPaths: route => route.match(/:[^/]+/),
  normalPaths: route => !route.match(/:[^/]+/),
});
console.log('Including these routes:');
console.log(normalPaths);
console.log('Ignoring parameterized paths:');
console.log(paramPaths);

const writeToFile = (responses) => {
    // Write all responses from the server to a file
    const results = {
      deferred: paramPaths,
      responses,
    };

    fs.writeFile(logDestination, JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Wrote to ${logDestination}`);
      }
      process.exit();
    });
  }

  const sendToServer = (responses) => {
    console.log(process.env.WEBHEAD_USER_PORT);
    axios.post('http://localhost:7913/results', responses)
      .then(res => console.log('success??'))
      .catch(err => console.error('fuck!!!!'));
    // http.request({
    //   method: 'POST',
    //   port: 7913,//make env variable for our port
    //   body: JSON.stringify(responses),
    //   path: '/results',
    //   headers: {'Content-Type': 'application/json'}
    // }, (response) => {
    //   console.log('response?');
    // }).on('error', error => console.log('Couldn\'t post to server', error))
  }


// Run through every route and fire a request with every attached method
console.log('Requesting now...');

requestAll(normalPaths, routes, PORT, nativeRequest)
  .then(sendToServer)
  .catch((error) => {
    console.error(error);
    process.exit();
  });

