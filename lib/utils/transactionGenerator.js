const { parseHeaders } = require('./parse-headers');
const applyRules = require('./apply-rules');

// this function takes in raw transaction data and outputs the standard schema for a transaction
const transactionGenerator = (raw) => {
  const transaction = {
    metadata: {
      url: '',
      method: '',
      api: '',
      external: null,
      flags: [],
    },
    request: {
      headers: {},
      body: '',
      cookies: [],
    },
    response: {
      statusCode: 0,
      headers: {},
      body: '',
      setCookie: [],
      contentSecurityPolicy: {},
      featurePolicy: {},
    },
    warnings: {
      req: {},
      res: {},
    },
  };

  // transfer metadata from raw transaction to outputted transaction
  Object.assign(transaction.metadata, raw.metadata);
  // transfer request data from raw transaction to outputted transaction
  Object.assign(transaction.request, raw.request);
  // transfer response data from raw transaction to outputted transaction
  Object.assign(transaction.response, raw.response);

  // set a variable to hold the results of applying the rules to the request
  const reqResults = applyRules(transaction, 'request');
  // add all warnings to the transaction object
  transaction.warnings.req = reqResults.warnings;
  // add all flags to the transaction object
  transaction.metadata.flags.push(...reqResults.flags);


  // set a variable to hold the results of applying the rules to the response
  const resResults = applyRules(transaction, 'response');
  // add all warnings to the transaction object
  transaction.warnings.res = resResults.warnings;
  // add all flags not already present on the transaction object
  transaction.metadata.flags = [...new Set(transaction.metadata.flags.concat(resResults.flags))];

  if (transaction.response.body.length) transaction.metadata.flags.push('hasBody');
  
  // parse headers from request and response, and populate their respected keys
  Object.assign(transaction.request, parseHeaders(raw.request.headers));
  Object.assign(transaction.response, parseHeaders(raw.response.headers));
  return transaction;
};

module.exports = transactionGenerator;

