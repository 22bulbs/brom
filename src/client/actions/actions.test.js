import * as actions from './actions';
import * as types from '../constants/actionTypes';
import { sampleData } from '../../../sampleData';


const sampleTransaction = [
  {
    "metadata": {
      "url": "/",
      "method": "POST",
      "api": "n/a",
      "external": false,
      "flags": [
        "severe", "deprecated", "csp"
      ]
    },
    "request": {
      "headers": {
        "content-type": "application/json",
      },
      "body": "This is a sample body that we will render in a request",
      "cookies": [
        {
          "name": "hello",
          "value": "world!"
        }
      ]
    },
    "response": {
      "statusCode": 200,
      "headers": {
        "x-powered-by": "Express",
        "content-type": "text/html; charset=utf-8",
        "content-length": "16",
        "etag": "W/\"10-EhqoRZdNVGSHLY3Ifb0sTKCvL7g\"",
        "date": "Thu, 02 Aug 2018 05:40:43 GMT",
        "connection": "close"
      },
      "body": "Don't post here!",
      "setCookie": [
        {
          "name": "bad",
          "value": "true",
          "Path": "/"
        }
      ],
      "contentSecurityPolicy": {},
      "featurePolicy": {}
    },
    "warnings": {
      "req": {},
      "res": {
        "content-security-policy": [
          "No Content Security Policy in place."
        ],
        "x-powered-by": [
          "x-powered-by header should not be sent."
        ]
      }
    }
  }
]

const sampleTransactionAction = {
  type: types.ADD_TRANSACTION,
  payload: sampleTransaction
}
const sampleGlobalData = {
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
}
describe('addTransaction action creator', () => {
  test('creates an action with a type and payload of a single transaction', () => {
    expect(actions.addTransaction(sampleTransaction)).toEqual(sampleTransactionAction);
  });
});

describe('addTransaction action creator', () => {
  test('creates an action with type="ADD_TRANSACTION" and payload of an array of transaction objects', () => {
    expect(actions.addTransaction(sampleData)).toEqual({
      type: types.ADD_TRANSACTION,
      payload: sampleData
    });
  });
});

describe('selectTransaction action creator', () => {
  test('creates an action with type "SELECT_TRANSACTION" and payload of passed in integer value', () => {
    expect(actions.selectTransaction(0)).toEqual({
      type: types.SELECT_TRANSACTION,
      payload: 0
    });
  });
});

describe('setTransactionMethodFilter action creator', () => {
  test('creates an action with type "SET_TRANSACTION_METHOD_FILTER" and payload of string corresponding to a passed in HTTP method', () => {
    expect(actions.setTransactionMethodFilter('POST')).toEqual({
      type: types.SET_TRANSACTION_METHOD_FILTER,
      payload: 'POST'
    });
  });
});

describe('toggleTransactionFlag action creator', () => {
  test('creates an action with type "TOGGLE_TRANSACTION_FLAG" and payload of a flag string', () => {
    expect(actions.toggleTransactionFlag('severe')).toEqual({
      type: types.TOGGLE_TRANSACTION_FLAG,
      payload: 'severe'
    });
  });
});

describe('setTransactionDomain action creator', () => {
  test('creates an action with type "SET_TRANSACTION_DOMAIN" and a boolean payload', () => {
    expect(actions.setTransactionDomain(true)).toEqual({
      type: types.SET_TRANSACTION_DOMAIN,
      payload: true
    });
  });
});

describe('updateGlobalData action creator', () => {
  test('creates an action with type "UPDATE_GLOBAL_DATA" and a payload object of global server data', () => {
    expect(actions.updateGlobalData(sampleGlobalData)).toEqual({
      type: types.UPDATE_GLOBAL_DATA,
      payload: sampleGlobalData
    });
  });
});



