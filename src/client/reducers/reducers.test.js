import * as reducers from './transactionsReducer.js';
import { globalDataReducer } from './globalDataReducer';
import { sampleData, singleSampleTransaction } from '../../../sampleData';
import * as actions from '../actions/actions';
import { addIndex } from './transactionsReducer.js';

const defaultCase = { type: 'random', payload: 'nothing' };

describe('transactions reducer', () => {
  test('should initialize state as an empty array', () => {
    expect(reducers.transactions(undefined, defaultCase)).toEqual([]);
  });
  test('should return a non-empty initial state', () => {
  expect(reducers.transactions(singleSampleTransaction, defaultCase)).toEqual(singleSampleTransaction);
  });
  test('should handle ADD_TRANSACTION', () => {
    const action = actions.addTransaction(singleSampleTransaction);
    const final = [
      {
        "id": 0,
        ...singleSampleTransaction[0],
      }
    ];
    expect(reducers.transactions(undefined, action)).toEqual(final);
  });
});

describe('selectedTransactionIndex reducer', () => {
  test('should return initial state in default case', () => {
    expect(reducers.selectedTransactionIndex(undefined, defaultCase)).toEqual(0);
  });
  test('should handle SELECT_TRANSACTION', () => {
    const action = actions.selectTransaction(5);
    expect(reducers.selectedTransactionIndex(0, action)).toBe(5);
  });
});

describe('transactionMethodFilter reducer', () => {
  test('should return initial state in default case', () => {
    expect(reducers.transactionMethodFilter(undefined, defaultCase)).toBe('ALL');
  });
  test('should handle SET_TRANSACTION_METHOD_FILTER', () => {
    const action = actions.setTransactionMethodFilter('GET');
    expect(reducers.transactionMethodFilter(undefined, action)).toBe('GET');
  });
});

describe('transactionFlagFilter reducer', () => {
  test('should return initial state in default case', () => {
    expect(reducers.transactionFlagFilter(undefined, defaultCase)).toEqual([]);
  });
  test('should handle TOGGLE_TRANSACTION_FLAG by adding a flag to the state array', () => {
    const action = actions.toggleTransactionFlag('severe');
    expect(reducers.transactionFlagFilter(undefined, action)).toContain('severe');
  });
  test('should handle TOGGLE_TRANSACTION_FLAG by removing a flag already in the state array', () => {
    const initialState = ['severe', 'csp'];
    const action = actions.toggleTransactionFlag('csp');
    expect(reducers.transactionFlagFilter(initialState, action)).not.toContain('csp');
  });
});

describe('transactionDomainFilter reducer', () => {
  test('should return initial state in default case', () => {
    expect(reducers.transactionDomainFilter(undefined, defaultCase)).toBeNull();
  });
  test('should handle SET_TRANSACTION_DOMAIN_FILTER and set to either true or false', () => {
    const action = actions.setTransactionDomain(true);
    expect(reducers.transactionDomainFilter(undefined, action)).toBe(true);
  });
  test('should handle SET_TRANSACTION_DOMAIN_FILTER and clear filter if payload is equal to current filter', () => {
    const initialState = false;
    const action = actions.setTransactionDomain(false);
    expect(reducers.transactionDomainFilter(initialState, action)).toBeNull();
  });
});

describe('globalDataReducer reducer', () => {
  test('should return initial state in default case', () => {
    expect(globalDataReducer(undefined, defaultCase)).toEqual({});
  });
  test('should handle UPDATE_GLOBAL_DATA', () => {
    const global = {
      ports: {
        app: 3000,
        proxy: 9999,
        results: 7913,
      },
      title: 'demo title',
      protocol: 'http',
      methods: {
        GET: 55,
        POST: 23,
        DELETE: 10,
        PUT: 33,
        PATCH: 17,
        JOKE: 13,
        HAHA: 1,
        LITTLEMORE: 4
      },
      totals: {
        transactions: 59,
        severe: 12,
        deprecated: 3,
        conflicting: 1,
        redundant: 0,
        internal: 29,
        external: 30
      }
    };
    const action = actions.updateGlobalData(global);
    expect(globalDataReducer({}, action)).toEqual(global);
  });
});
