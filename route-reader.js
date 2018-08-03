/* eslint no-console: 0 */
/* eslint import/no-dynamic-require: 0 */

const PORT = process.env.WEBHEAD_USER_PORT;

const http = require('http');
const findExpressRoutes = require('./find-express-routes');
const addRequestListeners = require('./add-request-listeners');
const requestAll = require('./request-all');
const axios = require('axios');
const { shake } = require('./utils');

// Require in server
console.log(`examining ${process.env.WEBHEAD_USER_SERVER}`);
const app = require(process.env.WEBHEAD_USER_SERVER);

// Initialize and configure global-request-logger
const nativeRequest = http.request;
function reqSuccess(req, res) {
  console.log(`INTERNAL: Your server successfully requested ${req.href} (${res.statusCode})`);
}

function reqError(req, res) {
  console.log(`INTERNAL: Your server failed a request to ${req.href} (${res.statusCode})`);
}

addRequestListeners(reqSuccess, reqError);

// Parse server's supported routes and methods
const routes = findExpressRoutes(app._router.stack);
const { paramPaths, normalPaths } = shake(Object.keys(routes), {
  paramPaths: route => route.match(/:[^/]+/),
  normalPaths: route => !route.match(/:[^/]+/),
});
console.log('Including these routes:');
console.log(normalPaths);
console.log('Ignoring parameterized paths:');
console.log(paramPaths);

const sendToServer = (responses) => {
  axios.post('http://localhost:7913/results', responses)
    .catch(err => console.error('Cannot post to results server', err));
};

// Run through every route and fire a request with every attached method
console.log('Making automated requests...');

requestAll(normalPaths, routes, PORT, nativeRequest)
  .then(sendToServer)
  .catch((error) => {
    console.error(error);
  });

