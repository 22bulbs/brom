import { combineReducers } from 'redux';

const reducersFile = require('./transactionsReducer');

const reducers = combineReducers({
  transactions: reducersFile.transactionsReducer,
  transactionMethodFilter: reducersFile.transactionMethodFilterReducer
})

export default reducers;