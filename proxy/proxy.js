const request = require('request');
const axios = require('axios');
const zlib = require('zlib');
const escapeHTML = require('escape-html');

const { makeScriptInjector, makeRawTransaction, decompress } = require('./proxy-tools');
const transactionGenerator = require('../transactionGenerator')

const PROTOCOL = process.env.WEBHEAD_USE_HTTPS ? 'https' : 'http';

// This is the core functionality of our proxy. At it's simplest, it
// pipes data from the request into its destination, and pipes the 
// response to the client, while recording all relevant information. 
// If the response includes a content-type of text/html the proxy will
// inject a script to monitor requests to 3rd parties into its head tag.
// The proxy also has the ability to decompress and recompress data that
// has been gzipped.
function proxy(req, res, next) {

  let reqBody = [];
  let resBody = [];

  // make a config object for request using the specifications set by the config file/cli
  const requestConfig = {
    url: `${PROTOCOL}://localhost:${process.env.WEBHEAD_USER_PORT}${req.url}`,
    rejectUnauthorized: false
  };

  //chunk data into a buffer
  req.on('data', (chunk) => {
    reqBody.push(chunk);
  });

  // unless preserve-caching is enabled, delete request headers related to caching to 
  // ensure the script is installed properly.
  if (!process.env.WEBHEAD_PRESERVE_CACHING) {
    delete req.headers['if-none-match'];
    delete req.headers['if-modified-since'];
  }

  //pipe the request to the destination
  const data = req.pipe(request(requestConfig).on('response', (response) => {
    //make a new injector transform stream to use if the response contains an HTML document
    const injector = makeScriptInjector();

    //chuck response data into a buffer
    response.on('data', (chunk) => {
      resBody.push(chunk);
    });

    response.on('end', () => {
      //decompress and truncate the reqBody if necessary
      const formattedReqBody = decompress(reqBody, req.headers);

      //do the same for resBody and escape html if necessary
      let formattedResBody;
      if (response.headers['content-type'].match('text/html')) {
        formattedResBody = escapeHTML(decompress(resBody, response.headers))
      } else {
        formattedResBody = decompress(resBody, response.headers);
      }

      //create a raw transaction object
      const raw = makeRawTransaction(req, formattedReqBody, response, formattedResBody);

      //format the raw transaction and post to results server
      axios.post(
          `http://localhost:${process.env.WEBHEAD_RESULTS_PORT}/results`,
          transactionGenerator(raw)
        )
        .catch(error => console.log(error));
    })

    //if the response contains an html document check its compression,
    //then decompress, inject script, recompress, and pipe to client
    if (response.headers['content-type'].match('text/html')) {
      // delete content-length header to keep response from being truncated
      delete response.headers['content-length'];
      //pass headers and status through to client
      res.set(response.headers);
      res.status(response.statusCode);

      //determine which compression type to use if necessary
      switch (response.headers['content-encoding']) {
        case 'gzip':
          data
            .pipe(zlib.createGunzip())
            .pipe(injector)
            .pipe(zlib.createGzip())
            .pipe(res);
          break;
        case 'deflate':
          data
            .pipe(zlib.createInflate())
            .pipe(injector)
            .pipe(zlib.createDeflate())
            .pipe(res);
          break;
        default:
          data
            .pipe(injector)
            .pipe(res);
      }

    } else {
      //otherwise pipe the response to the client as-is
      data.pipe(res);
    }
  }));
}

module.exports = proxy;