#!/usr/bin/env node

/* eslint global-require: 0 */
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const config = require('./utils/normalize-config');

const options = config.defaults;

process.env.BROM_RESULTS_PORT = config['results-port'] || 7913;
process.env.BROM_PROXY_PORT = config['proxy-port'] || 9999;

if (options.help) {
  console.log(`
  USAGE: brom <server.js> <port> [options]
  OPTIONS:
    -m, --disable-autostart       Perform analysis on seperately running
                                  server. Can't be used with automated.
    -a, --automated               Detect and request all available routes
                                  (express only).
    -d, --do-not-spy              Turn off interactive analysis.
    -w, --write-dir=DIRNAME       Write results to
                                  <DIRNAME>/<timestamp>_brom_results.json
    -g, --suppress-gui            Do not automatically open GUI in browser.
    -b, --browser=BROWSER         Open GUI in specified browser.
    -s, --https                   Start proxy server in HTTPS.
    -c, --preserve-caching        Preserve browser's default caching behavior.
                                  Warning: When using the preserve-caching
                                  option, make sure to empty your browser's
                                  cache before running.
    -v, --version                 Print the version number
    -p, --plain-text              Launches a simplified plain-text client
    --ci                          Continuous integration mode. Will error
                                  out of build if a Rule with a halt setting
                                  fails.
  `);
  process.exit(0);
}

if (options.version) {
  const details = fs.readFileSync(path.resolve(__dirname, '../package.json'));
  const { version } = JSON.parse(details.toString());
  console.log(version);
  process.exit(0);
}

if (options.ci) {
  process.env.BROM_CI_MODE = true;
}

if (options['disable-autostart'] && options.automated) {
  console.error('Automated analysis can not be used in conjunction with diable-autostart flag');
  process.exit(1);
}

if (!config.server && !options['disable-autostart']) {
  console.error('Please provide path to server.');
  process.exit(1);
} else {
  process.env.BROM_USER_SERVER = path.resolve(process.cwd(), config.server);
}

if (!config.port) {
  console.error('No port provided.');
  process.exit(1);
} else {
  process.env.BROM_USER_PORT = config.port;
}

// if write-file flag is provided, set that filename to an environment variable
if (options['write-dir']) {
  process.env.BROM_WRITE_DESTINATION = path.resolve(process.cwd(), options['write-dir']);
}

// if preserve caching flag is provided, set an environment variable for caching to true
if (options['preserve-caching']) {
  process.env.BROM_PRESERVE_CACHING = true;
}

if (options.https) {
  if (!config.https.key || !config.https.cert) {
    console.error('HTTPS mode requires relative paths to both .key and .crt, please include in brom.config.json');
    process.exit(1);
  } else {
    process.env.BROM_USE_HTTPS = true;
    process.env.BROM_HTTPS_KEY = path.resolve(process.cwd(), config.https.key);
    process.env.BROM_HTTPS_CERT = path.resolve(process.cwd(), config.https.cert);
  }
}

//determine if gui should be robust or plaintext
if (options['plain-text']) {
  process.env.BROM_PLAIN_GUI = true;
}

//set the title to be displayed in the client
if (config.title) {
  process.env.BROM_TITLE = config.title
} else {
  process.env.BROM_TITLE = `localhost:${config.port}`
}

// start the results server to serve the client
require('./results/server.js');
// start the proxy server
if (!options['do-not-spy']) {
  require('./proxy/server.js');
}

// if the the path to the user's server is valid, open it, otherwise error out.
if (!options['disable-autostart']) {
  try {
    console.log(`Loading ${process.env.BROM_USER_SERVER} on port ${process.env.BROM_USER_PORT}`);
    require(process.env.BROM_USER_SERVER);
  } catch (err) {
    console.error('Failed to load user server:');
    console.error(err);
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
  require('./automation');
}
