const fs = require('fs');
var path = require('path')

const alias = {
  a: 'automated',
  b: 'browser',
  c: 'preserve-caching',
  d: 'do-not-spy',
  g: 'suppress-gui',
  i: 'no-interactive',
  m: 'disable-autostart',
  s: 'https',
  v: 'version',
  w: 'write-dir',
}
const argv = require('minimist')(process.argv.slice(2), { alias });

for (let key in alias) {
  delete argv[key]
}

let config = {
  defaults: {},
  'proxy-port': 9999,
  'results-port': 7913
 };
const configFile = path.resolve(process.cwd(), 'brom.config.json');
if (fs.existsSync(configFile)) {
  config = JSON.parse(fs.readFileSync(configFile))
}

if (argv._.length > 2) {
  throw new Error('Invalid number of arguments. Please only provide a server and port.');
}
argv._.forEach(arg => {
  if (typeof arg === 'number') {
    config.port = arg;
  } else {
    config.server = arg;
  }
})
delete argv._;

Object.assign(config.defaults, argv);

module.exports = config;
