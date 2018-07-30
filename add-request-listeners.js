/* eslint no-console: 0 */
const logger = require('global-request-logger');
const http = require('http');

function addRequestListeners(successListener, errorListener) {
  logger.initialize();
  http.get = function get(url, options, cb) {
    const req = http.request(url, options, cb);
    req.end();
    return req;
  };
  logger.on('success', successListener);
  logger.on('error', errorListener);
}

module.exports = addRequestListeners;
