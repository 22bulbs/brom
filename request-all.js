const http = require('http');
const transactionGenerator = require('./transactionGenerator')
/**
 * Request along some set of paths, using an object detailing which methods to
 * use. This function is called after http.request has been overridden, so it
 * (optionally) takes in the non-overridden request core function.
 *
 * @param {array} paths A list of (localhost) paths to send requests to
 * @param {object} methodMap An object representing both paths and corresponding methods eg
 *   {
 *     '/': ['GET'],
 *     '/users': ['GET', 'POST']
 *   }
 * @param {number} port The port of the server to send requests to
 * @param {function} [nativeRequest] An original or monkey-patched http.request
 * @returns {Promise} A Promise.all representing each request made
 */
function requestAll(paths, methodMap, port, nativeRequest = http.request) {
  console.log(paths, methodMap);
  const requests = [];
  paths.forEach((path) => {
    methodMap[path].forEach((method) => {
      requests.push(new Promise((resolve, reject) => {
        nativeRequest({ path, method, port }, (res) => {
          let body = '';
          res.on('data', (chunk) => {
            body += chunk;
          });

          res.on('end', () => {
            const rawTransaction = {
              metadata: {
                url: path,
                method: method,
                api: 'n/a',
                external: false
              },
              request: {
                headers: {}
              },
              response: {
                headers: res.headers,
                statusCode: res.statusCode,
                body: body
              }
            }
            resolve(transactionGenerator(rawTransaction))
          });
        }).on('error', err => reject(err)).end();
      }));
    });
  });
  return Promise.all(requests);
}

module.exports = requestAll;
