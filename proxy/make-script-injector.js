const { Transform } = require('stream');
const fs = require('fs');

const spyScript = fs.readFileSync(__dirname + '/spy.js', 'utf8')

module.exports = function makeScriptInjector() {
  return new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      let transformed;
      if (chunk.toString().match('<head>')) {
        const injected = chunk.toString().replace('<head>', `<head><script type="text/javascript">${spyScript}</script>`);
        transformed = Buffer.from(injected, 'utf8');
      } else {
        transformed = chunk;
      }
      return callback(null, transformed);
    },
    flush(callback) {
      this.push(Buffer.from('\n', 'utf8'));
      callback();
    }
  });
};

