function enforce(index, message, id) {
  const ruleError = id ?
    new TypeError(`Rule ${index} (${id}) - ${message}`) :
    new TypeError(`Rule ${index} - ${message}`);
  throw ruleError;
}

module.exports = function validateRule(rule, index) {
  if (!(typeof rule === 'object')) {
    enforce('Rule must be an object', index);
  }

  const {
    id,
    header,
    when,
    expect,
    fail
  } = rule;
  const pass = rule.pass || {};

  if (typeof id !== 'string') {
    enforce(index, 'rule id is not a string');
  }
  if (typeof header !== 'string') {
    enforce(index, 'rule header is not a string', id);
  }
  // UI expects a lower-case header
  rule.header = header.toLowerCase();

  if (typeof when !== 'function') {
    enforce(index, "'when' must be a function", id);
  }
  if (typeof expect !== 'function') {
    enforce(index, "'expect' must be a function", id);
  }
  if (typeof fail !== 'object' || typeof fail.message !== 'string') {
    enforce(index, 'please provide a fail message', id);
  }
  if (fail.flags && !Array.isArray(fail.flags)) {
    enforce(index, 'flags must be an array of strings', id);
  }
  if (pass.message && typeof pass.message !== 'string') {
    enforce(index, 'pass messages must be strings', id);
  }
  if (pass.flags && !Array.isArray(pass.flags)) {
    enforce(index, 'flags must be an array of strings', id);
  }
};

