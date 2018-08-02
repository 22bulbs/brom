const parseHeaders = require('./parse-headers')
const headers =  {
        "x-powered-by": "Express",
        "location": "/",
        "vary": "Accept",
        "content-type": "text/html; charset=utf-8",
        "content-length": "23",
        "date": "Thu, 02 Aug 2018 00:14:35 GMT",
        "connection": "close"
      }

const rules = [
  {
    //header that the rule applies to
    header: "content-security-policy",
    //function to determine when to check this rule
    when: headers => headers["content-type"] && headers["content-type"].indexOf("text/html") !== -1,
    //function to determine if rule passes or fails
    expect: headers => headers["content-security-policy"],
    //message and flags to set if rule fails
    fail: {
      message: "No Content Security Policy in place.",
      flags: ["severe"]
    },
    //message and flags to set if rule passes
    pass: {
      flags: ["csp"]
    } 
  },
  {
    header: "x-powered-by",
    when: headers => true,
    expect: headers => !headers["x-powered-by"],
    fail: {
      message: "x-powered-by header should not be sent.",
      flags: ["severe"]
    },
    pass: {
      flags: []
    } 
  }
]

const applyRules = (rules, headers) => {
  const output = {
    warnings: {},
    flags: []
  }
  rules.forEach(rule => {
    if (rule.when(headers)) {
      const pass = rule.expect(headers);
      if (pass) {
        output.flags = [...new Set(output.flags.concat(rule.pass.flags))]
        if (output.warnings[rule.header] && rule.pass.message) {
          output.warnings[rule.header].push(rule.pass.message)
        } else if (rule.pass.message) {
          output.warnings[rule.header] = [ rule.pass.message ]
        }
      } else {
        output.flags = [...new Set(output.flags.concat(rule.fail.flags))];
        if (output.warnings[rule.header] && rule.fail.message) {
          output.warnings[rule.header].push(rule.fail.message)
        } else if (rule.fail.message) {
          output.warnings[rule.header] = [ rule.fail.message ]
        } else {
          console.warn('No failure message provided for rule:', rule)
        }
      }
    }
  })
  return output;
}

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

  const reqResults = applyRules(rules, transaction.request.headers);
  transaction.warnings.req = reqResults.warnings;
  transaction.metadata.flags.push(...reqResults.flags);

  const resResults = applyRules(rules, transaction.response.headers);
  transaction.warnings.res = resResults.warnings;
  transaction.metadata.flags = [...new Set(transaction.metadata.flags.concat(resResults.flags))];

  //parse headers from request and response, and populate their respected keys
  Object.assign(transaction.request, parseHeaders(raw.request.headers));
  Object.assign(transaction.response, parseHeaders(raw.response.headers));

  return transaction;
}

module.exports = transactionGenerator;

console.log(applyRules(rules, headers));

