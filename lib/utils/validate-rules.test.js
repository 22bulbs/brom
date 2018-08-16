import { enforce } from './validate-rule';
const validateRule = require('./validate-rule');


describe('validateRule', () => {
  test('should throw an error on a nonsense rule', () => {
    const gibberish = () => validateRule('');
    expect(gibberish).toThrow(TypeError);
  });
});


