const { parseHeaders } = require('./parse-headers');
const sampleRules = require('./sample-rules');

const applyRules = (rules, { headers }, type) => {
  const output = {
    warnings: {},
    flags: [],
  };
  rules.forEach((rule) => {
    if (rule.when(headers, type)) {
      const pass = rule.expect(headers);
      if (pass) {
        output.flags = [...new Set(output.flags.concat(rule.pass.flags))];
        if (output.warnings[rule.header] && rule.pass.message) {
          output.warnings[rule.header].push(rule.pass.message);
        } else if (rule.pass.message) {
          output.warnings[rule.header] = [rule.pass.message];
        }
      } else {
        output.flags = [...new Set(output.flags.concat(rule.fail.flags))];
        if (output.warnings[rule.header] && rule.fail.message) {
          output.warnings[rule.header].push(rule.fail.message);
        } else if (rule.fail.message) {
          output.warnings[rule.header] = [rule.fail.message];
        } else {
          console.warn('No failure message provided for rule:', rule);
        }
      }
    }
  });
  return output;
};

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

  const reqResults = applyRules(sampleRules, transaction.request, 'request');
  transaction.warnings.req = reqResults.warnings;
  transaction.metadata.flags.push(...reqResults.flags);

  const resResults = applyRules(sampleRules, transaction.response, 'response');
  transaction.warnings.res = resResults.warnings;
  transaction.metadata.flags = [...new Set(transaction.metadata.flags.concat(resResults.flags))];

  // parse headers from request and response, and populate their respected keys
  Object.assign(transaction.request, parseHeaders(raw.request.headers));
  Object.assign(transaction.response, parseHeaders(raw.response.headers));

  return transaction;
};

module.exports = transactionGenerator;

