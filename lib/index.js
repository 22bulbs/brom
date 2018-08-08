/* eslint global-require: 0 */
const path = require('path');
const opn = require('opn');

const config = require('./normalize-config');
const options = config.defaults;


if (options.help) {
  console.log(`
  USAGE: webhead <server.js> <port> [options]
  OPTIONS:
  -d, --disable-autostart       Perform analysis on seperately running
                                server. Can't be used with automated.
  -a, --automated               Detect and request all available routes 
                                (express only).
  -i, --no-interactive          Turn off interactive analysis.
  -w, --write-file=FILENAME     Write results to .json file.
  -g, --no-gui                  Do not automatically open GUI in browser.
  -b, --browser=BROWSER         Open GUI in specified browser.
  -s, --https                   Start proxy server in HTTPS.
  -c, --preserve-caching        Preserve browser's default caching behavior.
                                Warning: When using the preserve-caching 
                                option, make sure to empty your browser's 
                                cache before running.
  `);
  process.exit(0);
}

if (options['disable-autostart'] && options.automated) {
  console.error('Automated analysis can not be used in conjunction with no-start flag');
  process.exit(1);
}

if (!config.server && !options['disable-autostart']) {
  console.error('Please provide path to server.');
  process.exit(1);
} else {
  process.env.WEBHEAD_USER_SERVER = path.resolve(process.cwd(), config.server);
}

if (!config.port) {
  console.error('No port provided.');
  process.exit(1);
} else {
  process.env.WEBHEAD_USER_PORT = config.port;
}

// if write-file flag is provided, set that filename to an environment variable
if (options['write-file']) {
  process.env.WEBHEAD_WRITE_DESTINATION = options['write-file'];
}

// if preserve caching flag is provided, set an environment variable for caching to true
if (options['preserve-caching']) {
  process.env.WEBHEAD_PRESERVE_CACHING = true;
}

if (options.https) {
  process.env.WEBHEAD_USE_HTTPS = true;
}

// start the server to serve the client
require('../server/server.js');
// start the proxy server
if (!options['do-not-spy']) {
  require('../proxy/server.js');
}

// if the the path to the user's server is valid, open it, otherwise error out.
if (!options['disable-autostart']) {
  try {
    require(process.env.WEBHEAD_USER_SERVER);
  } catch (err) {
    console.error('Failed to load user server.', err);
    process.exit(1);
  }
}

// open the client in the user's default browser
if (!options['suppress-gui']) {
  if (options.browser) {
    opn('http://localhost:7913', { app: options.browser });
  } else {
    opn('http://localhost:7913');
  }
}

if (options.automated) {
  require('../route-reader.js');
}