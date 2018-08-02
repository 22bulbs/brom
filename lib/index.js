const path = require('path');
const opn = require('opn');
const argv = require('minimist')(process.argv.slice(2));

//store the port that the user's server is running on (as provided in the cli)

process.env.WEBHEAD_USER_PORT = argv._[1];
console.log(argv);

if (argv.help) {
	console.log(`
  USAGE: webhead <server.js> <port> [options]
  OPTIONS:
  -a, --automated               Detect and request all available routes (express only).
  -i, --no-interactive          Turn off interactive analysis.
  -w, --write-file=FILENAME     Write results to .json file.
  -g, --no-gui                  Do not automatically open GUI in browser.
  -b, --browser=BROWSER         Open GUI in specified browser.
	`);
	process.exit(0);
}


if (!argv._[1]) {
	console.error('No port provided.');
	process.exit(1);
}

//if write-file flag is provided, set that filename to an environment variable
const fileDestination = argv.w || argv['write-file']
if (fileDestination) {
	process.env.WEBHEAD_WRITE_DESTINATION = fileDestination;
}

//start the server to serve the client
require('../server/server.js');
//start the proxy server
if (!argv.i && !argv['no-interactive']) {
	require('../proxy/server.js');

}

//if the the path to the user's server is valid, open it, otherwise error out.
try {
	require(path.resolve(process.cwd(), argv._[0]))
}
catch(err) {
	console.error('Failed to load user server.', err)
	process.exit(1);
}

//open the client in the user's default browser
if (!argv.g && !argv['no-gui']) {
	const browser = argv.browser || argv.b
	if (browser) {
		opn('http://localhost:7913', {app: browser})
	} else {
		opn('http://localhost:7913')
	}
}

if (argv.automated || argv.a){
	require('../route-reader.js')
}

