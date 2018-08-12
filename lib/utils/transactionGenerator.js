const path = require('path');
const fs = require('fs');
const { parseHeaders } = require('./parse-headers');
const sampleRules = require('./sample-rules');
const { smartConcat } = require('./utils.js');

let exclusions = [];

const configFile = path.resolve(process.cwd(), 'brom.config.json');
if (fs.existsSync(configFile)) {
  const config = JSON.parse(fs.readFileSync(configFile));
  exclusions = config['ignore-rules'] || exclusions;
}

const applyRules = (rules, transaction, type) => {
  let headers = transaction[type].headers;
  //make object for the collective output of all rules
  const output = {
    warnings: {},
    flags: [],
  };

  //apply each rule
  rules.forEach((rule) => {
    //console.log(rule.id, headers['content-type'], rule.when(headers, type), type);
    const { header, id } = rule;
    //check if the rule is excluded
    if (exclusions.includes(id)) return;
    //run the 'when' method to whether or not to run the 'expect' callback
    if (rule.when(headers, type)) {
      //if 'when' condition is true, set a variable to hold the output of the expect variable
      const pass = rule.expect(headers);
      //if the rule passes
      if (pass) {
        //add all associated flags to the flags output
        output.flags = [...new Set(output.flags.concat(rule.pass.flags))];
        //if there is an associated message, add it on to the warnings object
        if (rule.pass.message) {
          output.warnings[header] = smartConcat(output.warnings[header], `${id}: ${rule.pass.message}`)
        }
      } else {
        //add all associated flags to the flags output
        output.flags = [...new Set(output.flags.concat(rule.fail.flags))];
        //if there is an associated message, add it on to the warnings object
        if (rule.fail.message) {
          output.warnings[header] = smartConcat(output.warnings[header], `${id}: ${rule.fail.message}`)
        } else {
          console.warn('No failure message provided for rule:', rule);
        }
        //if rule has a halt setting, record it's warning to the errors object
        if (rule.halt && process.env.BROM_CI_MODE) {
          if (!transaction.halt) {
            transaction.halt = {};
          }
          transaction.halt[id] = rule.fail.message;
        }
      }
    }
  });

  //after applying all rules, return their output
  return output;
};

//this function takes in raw transaction data and outputs the standard schema for a transaction
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

  //set a variable to hold the results of applying the rules to the request
  const reqResults = applyRules(sampleRules, transaction, 'request');
  //add all warnings to the transaction object
  transaction.warnings.req = reqResults.warnings;
  //add all flags to the transaction object
  transaction.metadata.flags.push(...reqResults.flags);

  //set a variable to hold the results of applying the rules to the response
  const resResults = applyRules(sampleRules, transaction, 'response');
  //add all warnings to the transaction object
  transaction.warnings.res = resResults.warnings;
  //add all flags not already present on the transaction object
  transaction.metadata.flags = [...new Set(transaction.metadata.flags.concat(resResults.flags))];

  // parse headers from request and response, and populate their respected keys
  Object.assign(transaction.request, parseHeaders(raw.request.headers));
  Object.assign(transaction.response, parseHeaders(raw.response.headers));
  return transaction;
};

module.exports = transactionGenerator;

