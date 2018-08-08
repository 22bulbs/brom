const sampleData = require('../../../sampleData');
import * as types from '../constants/actionTypes';

const initialState = {
  transactions: sampleData,
  selectedTransactionIndex: 0,
  transactionMethodFilter: 'ALL',
  transactionApiFilter: '',
  transactionFlagFilter: '',
  transactionDomainFilter: '' 
}

const transactionsReducer = (state = initialState.transactions, action) => {
  switch  (action.type) {
    case types.ADD_TRANSACTION: 
      return [...state, action.payload]
    default:
      return state;
  }
}

const selectedTransactionIndexReducer = (state = initialState.selectedTransactionIndex, action) => {
  switch (action.type) {
    case types.SELECT_TRANSACTION:
      return action.payload
    default:
      return state;
  }
}

const transactionMethodFilterReducer = (state = initialState.transactionMethodFilter, action) => {
  switch (action.type) {
    case types.SET_TRANSACTION_METHOD_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const transactionApiFilterReducer = (state = initialState.transactionApiFilter, action) => {
  switch (action.type) {
    case types.SET_TRANSACTION_API_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const transactionFlagFilterReducer = (state = initialState.transactionFlagFilter, action) => {
  switch (action.type) {
    case types.SET_TRANSACTION_FLAG_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const transactionDomainFilterReducer = (state = initialState.transactionDomainFilter, action) => {
  switch (action.type) {
    case types.SET_TRANSACTION_DOMAIN_FILTER:
      return action.payload;
    default:
      return state;
  }
}


module.exports = {
  transactionsReducer,
  transactionMethodFilterReducer,
  selectedTransactionIndexReducer,
  transactionApiFilterReducer,
  transactionFlagFilterReducer,
  transactionDomainFilterReducer
}
