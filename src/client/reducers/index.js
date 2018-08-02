import { combineReducers } from 'redux';

import { transactionsReducer, transactionMethodFilterReducer } from './transactionsReducer.js';

const reducers = combineReducers({
  transactions: transactionsReducer,
  transactionMethodFilter: transactionMethodFilterReducer
})

export default reducers;