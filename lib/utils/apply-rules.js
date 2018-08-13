const fs = require('fs');
const path = require('path');
const validateRule = require('./validate-rule');
const ruleSet = require('./starter-rules');
const { smartConcat } = require('./utils.js');

let exclusions = [];

const configFile = path.resolve(process.cwd(), 'brom.config.json');
if (fs.existsSync(configFile)) {
  const config = JSON.parse(fs.readFileSync(configFile));
  exclusions = config['ignore-rules'] || exclusions;
}
const rulesFile = path.resolve(process.cwd(), 'brom.rules.js');
if (fs.existsSync(rulesFile)) {
  const userRules = require(rulesFile);
  if (Array.isArray(userRules)) {
    userRules.forEach(validateRule);
    ruleSet.push(...userRules);
  } else {
    throw new TypeError('Custom rules must be an array of objects.');
  }
} else {
  console.log('No custom ruleset found. Going with the starter pack!');
}

module.exports = function applyRules(transaction, type) {
  const { headers } = transaction[type];
  // make object for the collective output of all rules
  const output = {
    warnings: {},
    flags: [],
  };

  // apply each rule
  ruleSet.forEach((rule) => {
    const { header, id } = rule;

    if (exclusions.includes(id)) return;

    // run the 'when' method to determine whether or not to run the 'expect' callback
    if (rule.when(headers, type)) {
      // set a variable to hold the output of the expect variable
      const pass = rule.expect(headers);

      if (pass && rule.pass) {
        // add all associated flags to the flags output
        if (rule.pass.flags) {
          output.flags = [...new Set(output.flags.concat(rule.pass.flags))];
        }

        // if there is an associated message, add it on to the warnings object
        if (rule.pass.message) {
          output.warnings[header] = smartConcat(output.warnings[header], `${id}: ${rule.pass.message}`);
        }
      } else {
        // add all associated flags to the flags output
        if (rule.fail.flags) {
          output.flags = [...new Set(output.flags.concat(rule.fail.flags))];
        }

        // if there is an associated message, add it on to the warnings object
        // rule validator will guarantee a fail message exists
        output.warnings[header] = smartConcat(output.warnings[header], `${id}: ${rule.fail.message}`);

        // if rule has a halt setting, record its warning to the errors object
        if (rule.halt && process.env.BROM_CI_MODE) {
          if (!transaction.halt) {
            transaction.halt = {};
          }
          transaction.halt[id] = rule.fail.message;
        }
      }
    }
  });

  // after applying all rules, return their output
  return output;
};

