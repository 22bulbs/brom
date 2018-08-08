const { Transform } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

const spyScript = fs.readFileSync(__dirname + '/spy.js', 'utf8')

//returns a new transform stream used to inject the spy script in html documents.
function makeScriptInjector() {
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


//take a request, request body, response, and response body and make
//a raw transaction object to be parsed by the transaction generator.
function makeRawTransaction(req, reqBody, res, resBody) {
  return {
    metadata: {
      url: req.url,
      method: req.method,
      api: '',
      external: false,
    },
    request: {
      headers: req.headers,
      body: reqBody,
    },
    response: {
      statusCode: res.statusCode,
      headers: res.headers,
      body: resBody
    }
  };
}

//take in a buffer and headers and determine if the body is compressed.
//if so, decompress it, otherwise concat and return.
function decompress(chunks, headers) {
  const buffer = Buffer.concat(chunks)
  if (!headers['content-encoding']) return buffer.toString().slice(0, 5000);
  if (headers['content-encoding'] === 'gzip') return zlib.gunzipSync(buffer).toString().slice(0, 5000);
  if (headers['content-encoding'] === 'deflate') return zlib.inflateSync(buffer).toString().slice(0, 5000);
  return 'unable to decompress';
}

module.exports = {
  makeScriptInjector,
  makeRawTransaction,
  decompress
}