const parseHeaders = require('./parse-headers')

const transactionGenerator = (raw) => {
  console.log(raw);
  const transaction = {
    "metadata": {
      "url": "",
      "method": "",
      "api": "",
      "external": null,
      "flags": []
    },
    "request": {
      "headers": {},
      "body": "",
      "cookies": []
    },
    "response": {
      "statusCode": 0,
      "headers": {},
      "body": "",
      "setCookie": [],
      "contentSecurityPolicy": {},
      "featurePolicy": {}
    },
    "warnings": {
      "req": {},
      "res": {}
    }
  }

  //transfer metadata from raw transaction to outputted transaction
  Object.assign(transaction.metadata, raw.metadata);
	//transfer request data from raw transaction to outputted transaction
  Object.assign(transaction.request, raw.request);
  //transfer response data from raw transaction to outputted transaction
  Object.assign(transaction.response, raw.response);

  //parse headers from request and response, and populate their respected keys
  Object.assign(transaction.request, parseHeaders(raw.request.headers));
  Object.assign(transaction.response, parseHeaders(raw.response.headers));

  return transaction;
}

module.exports = transactionGenerator;