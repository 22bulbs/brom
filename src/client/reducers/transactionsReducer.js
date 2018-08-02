const sampleData = require('../../../sampleData');


const initialState = {
  transactions: sampleData,
  selectedTransactionIndex: 0,
  transactionMethodFilter: '',
  transactionApiFilter: '',
  transactionFlagFilter: '',
  transactionDomainFilter: '' 
}

const ADD_TRANSACTION = 'ADD_TRANSACTION'
const SELECT_TRANSACTION = 'SELECT_TRANSACTION'
const SET_TRANSACTION_METHOD_FILTER = 'SET_TRANSACTION_METHOD_FILTER'
const SET_TRANSACTION_API_FILTER = 'SET_TRANSACTION_API_FILTER'
const SET_TRANSACTION_FLAG_FILTER = 'SET_TRANSACTION_FLAG_FILTER'
const SET_TRANSACTION_DOMAIN_FILTER = 'SET_TRANSACTION_DOMAIN_FILTER'

const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  payload: transaction
})

const selectTransaction = transactionIndex => ({
  type: SELECT_TRANSACTION,
  payload: transactionIndex
})

const setTransactionMethodFilter = method => ({
  type: SET_TRANSACTION_METHOD_FILTER,
  payload: method
})

const setTransactionApiFilter = api => ({
  type: SET_TRANSACTION_API_FILTER,
  payload: api
})

const setTransactionFlagFilter = flag => ({
  type: SET_TRANSACTION_FLAG_FILTER,
  payload: flag
})

const setTransactionDomainFilter = domain => ({
  type: SET_TRANSACTION_DOMAIN_FILTER,
  payload: domain
})

const transactionsReducer = (state = initialState.transactions, action) => {
  switch  (action.type) {
    case ADD_TRANSACTION: 
    // do i need to do a deep clone on action.transaction here before adding it to the transactions array? 
      return [...state, action.payload]
    default:
      return state;
  }
}

const selectedTransactionIndexReducer = (state = initialState.selectedTransactionIndex, action) => {
  switch (action.type) {
    case SELECT_TRANSACTION:
      return action.payload
    default:
      return state;
  }
}

const transactionMethodFilterReducer = (state = initialState.transactionMethodFilter, action) => {
  switch (action.type) {
    case SET_TRANSACTION_METHOD_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const transactionApiFilterReducer = (state = initialState.transactionApiFilter, action) => {
  switch (action.type) {
    case SET_TRANSACTION_API_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const transactionFlagFilterReducer = (state = initialState.transactionFlagFilter, action) => {
  switch (action.type) {
    case SET_TRANSACTION_FLAG_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const transactionDomainFilterReducer = (state.initialState.transactionDomainFilter, action) => {
  switch (action.type) {
    case SET_TRANSACTION_DOMAIN_FILTER:
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




