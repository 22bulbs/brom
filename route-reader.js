/* eslint no-console: 0 */
const app = require(`./${process.argv[2]}`); // eslint-disable-line import/no-dynamic-require
const http = require('http');
const fs = require('fs');

const PORT = process.env.TEST_PORT || 8080;
const logDestination = process.env.TEST_DESTINATION || 'responses.json';

const paths = app._router.stack // eslint-disable-line no-underscore-dangle
  .filter(layer => layer.route)
  .map(layer => layer.route.path);

const uniquePaths = [...new Set(paths)];

http.createServer(app).listen(process.env.TEST_PORT || 8080);

const requests = [];

uniquePaths.forEach((path) => {
  requests.push(new Promise((resolve, reject) => {
    http.get({ path, port: PORT }, (res) => {
      const { headers, statusCode } = res;
      resolve({ path, headers, statusCode });
    }).on('error', err => reject(err));
  }));
});

Promise.all(requests).then((responses) => {
  fs.writeFile(logDestination, JSON.stringify(responses, null, 2), (err) => {
    if (err) console.error(err);
    process.exit();
  });
}).catch(console.error);
