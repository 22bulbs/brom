const path = require('path');
const opn = require('opn');
const argv = require('minimist')(process.argv.slice(2));

//store the port that the user's server is running on (as provided in the cli)

process.env.WEBHEAD_USER_PORT = argv.port || argv.p;

if (!argv.port && !argv.p) {
	console.error('No port provided.');
	process.exit(1);
}

//start the server to serve the client
require('../server/server.js');
//start the proxy server
require('../proxy/server.js');

//if the the path to the user's server is valid, open it, otherwise error out.
try {
	require(path.resolve(process.cwd(), argv._[0]))
}
catch(err) {
	console.error('Failed to load user server.', err)
	process.exit(1);
}

//open the client in the user's default browser
opn('http://localhost:7913')

require('../route-reader.js')
console.log(argv);
