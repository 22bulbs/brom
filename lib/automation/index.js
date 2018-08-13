/* eslint no-console: 0 */
/* eslint import/no-dynamic-require: 0 */

const axios = require('axios');
const chalk = require('chalk');
const findExpressRoutes = require('./find-express-routes');
const requestAll = require('./request-all');
const { shake } = require('../utils/utils');
const checkForHalts = require('./check-for-halts');

// Require in server
console.log(`examining ${process.env.BROM_USER_SERVER}`);
const app = require(process.env.BROM_USER_SERVER);
const port = process.env.BROM_USER_PORT;

// Parse server's supported routes and methods
let routes;
try {
  routes = findExpressRoutes(app._router.stack);
} catch (e) {
  console.error(e.toString());
  console.error(chalk.red(`
  Unable to launch automated requests against server. Make sure your express
  app is a top-level export from the provided server file (module.exports = app)
  `));
}

const sendToServer = (responses) => {
  axios.post(`http://localhost:${process.env.BROM_RESULTS_PORT}/results`, responses)
    .catch(err => console.error('Cannot post to results server', err));
};

if (routes) {
  const { paramPaths, normalPaths } = shake(Object.keys(routes), {
    paramPaths: route => route.match(/:[^/]+/),
    normalPaths: route => !route.match(/:[^/]+/),
  });
  console.log('Ignoring parameterized paths:');
  paramPaths.forEach(path => console.log(`  ${path}`));

  // Run through every route and fire a request with every attached method
  console.log('Making automated requests...\n');

  if (process.env.BROM_CI_MODE) {
    const requests = requestAll(normalPaths, routes, port);
    Promise.all(requests.map(p => p.catch(e => e)))
      .then(checkForHalts);
  } else {
    requestAll(normalPaths, routes, port)
      .forEach((request) => {
        request
          .then(sendToServer)
          .catch((err) => {
            console.error(err.printout);
            console.error(err);
          });
      });
  }
}
