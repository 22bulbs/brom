// this is the server that the spy script redirects to
const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
const path = require('path');

const spyController = require('./spy-controller');
const proxy = require('./proxy.js');
const transactionGenerator = require('../transactionGenerator.js')

const app = express();
const PORT = process.env.WEBHEAD_PROXY_PORT;
const PROTOCOL = process.env.WEBHEAD_USE_HTTPS ? 'https' : 'http';

app.use(cookieParser());

//this route is only used to proxy requests to 3rd parties
//the hashed route prevents conflicts with proxied requests from client
app.post('/p4bcxeq3jgp2jvsx2tobdhs7',
  bodyparser.json({type: () => true}),
  spyController.report,
  spyController.redirect,
  spyController.generateTransaction,
  spyController.postTransaction,
  spyController.respond
);

//all requests the client makes to its own server are proxied through this route
app.use('/', 
  proxy
);

//if the config is set to use https, create an https serve
if (process.env.WEBHEAD_USE_HTTPS) {
  const certOptions = {
    key: fs.readFileSync(process.env.WEBHEAD_HTTPS_KEY),
    cert: fs.readFileSync(process.env.WEBHEAD_HTTPS_CERT)
  }
  https.createServer(certOptions, app).listen(PORT);
  console.log(`Proxy running with SSL Encryption. Visit your page at ${PROTOCOL}://localhost:${PORT}`);
} else {
  app.listen(PORT, () => console.log(`Proxy running. Visit your page at ${PROTOCOL}://localhost:${PORT}`));
}
