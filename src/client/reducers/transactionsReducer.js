const sampleData = require('../../../sampleData');


const initialState = {
  transactions: sampleData,
  transactionMethodFilter: '',
  transactionApiFilter: '',
  transactionFlagFilter: '',
  transactionDomainilter: ''
}

const ADD_TRANSACTION = 'ADD_TRANSACTION'
const SET_TRANSACTION_METHOD_FILTER = 'SET_TRANSACTION_METHOD_FILTER'

const addTransaction = transaction => ({
  transaction,
  type: ADD_TRANSACTION
})

const setTransactionMethodFilter = method => ({
  method, 
  type: SET_TRANSACTION_METHOD_FILTER
})


const transactionsReducer = (state = initialState.transactions, action) => {
  switch  (action.type) {
    case ADD_TRANSACTION: 
      return [...state, action.transaction]
    default:
      return state;
  }
}

const transactionMethodFilterReducer = (state = initialState.transactionMethodFilter, action) => {
  switch (action.type) {
    case SET_TRANSACTION_METHOD_FILTER:
      return action.method;
    default:
      return state;
  }
}

export default { transactionsReducer, transactionMethodFilterReducer } 




