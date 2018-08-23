const { enforce } = require('./validate-rule');
const validateRule = require('./validate-rule');

const sampleRule = {
    id: 'include-csp',
    header: 'content-security-policy',
    when: (headers, type) => (
      type === 'response' &&
      headers['content-type'] &&
      headers['content-type'].indexOf('text/html') !== -1
    ),
    expect: headers => headers['content-security-policy'],
    fail: {
      message: 'No Content-Security-Policy in place.',
      flags: ['severe']
    },
    pass: {
      flags: ['csp']
    }
  }


describe('validateRule', () => {
  test('should throw an error on a nonsense rule', () => {
    const gibberish = () => validateRule('');
    expect(gibberish).toThrow(TypeError);
  });
  test('should return nothing for a valid rule', () => {
    const result = () => validateRule(sampleRule);
    expect(result).not.toThrow(TypeError);
  });
  test('throw an error on a rule without an id', () => {
    const newRule = Object.assign({}, sampleRule)
    delete newRule.id;
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule with an incorrect type for an id', () => {
    const newRule = Object.assign({}, sampleRule)
    newRule.id = 1234;
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule without an associated header', () => {
    const newRule = Object.assign({}, sampleRule)
    delete newRule.header;
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule with an incorrect type for header', () => {
    const newRule = Object.assign({}, sampleRule)
    newRule.header = {"content-type": "application/json"};
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule without a "when" function', () => {
    const newRule = Object.assign({}, sampleRule)
    delete newRule.when;
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule where "when" is not a function', () => {
    const newRule = Object.assign({}, sampleRule)
    newRule.when = true;
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule without an "expect" function', () => {
    const newRule = Object.assign({}, sampleRule)
    delete newRule.expect;
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule where "expect" is not a function', () => {
    const newRule = Object.assign({}, sampleRule)
    newRule.expect = true;
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule without a message to display on fail', () => {
    const newRule = Object.assign({}, sampleRule)
    newRule.fail = {
      message: '',
      flags: ['severe']
    }
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule with an incorrect type for fail.message', () => {
    const newRule = Object.assign({}, sampleRule)
    newRule.fail = {
      message: {message:'failed'},
      flags: ['severe']
    }
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule with an incorrect type for fail.flags', () => {
    const newRule = Object.assign({}, sampleRule)
    newRule.fail = {
      message: 'failed',
      flags: { severe:true }
    }
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule with an incorrect type for pass.message', () => {
    const newRule = Object.assign({}, sampleRule)
    newRule.pass = {
      message: {message:'passed'},
      flags: ['csp']
    }
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
  test('throw an error on a rule with an incorrect type for pass.flags', () => {
    const newRule = Object.assign({}, sampleRule)
    newRule.pass = {
      message: 'passed',
      flags: { csp:true }
    }
    const result = () => validateRule(newRule)
    expect(result).toThrow(TypeError);
  });
});