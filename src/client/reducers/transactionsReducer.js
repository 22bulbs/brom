const sampleData = require('../../../sampleData');


const initialState = {
  transactions: sampleData,
  selectedTransaction: {},
  transactionMethodFilter: ''
  // transactionApiFilter: '',
  // transactionFlagFilter: '',
  // transactionDomainilter: ''
  
}

const ADD_TRANSACTION = 'ADD_TRANSACTION'
const SELECT_TRANSACTION = 'SELECT_TRANSACTION'
const SET_TRANSACTION_METHOD_FILTER = 'SET_TRANSACTION_METHOD_FILTER'

const addTransaction = transaction => ({
  transaction,
  type: ADD_TRANSACTION
})

const selectTransaction = transactionIndex => ({
  transactionIndex,
  type: SELECT_TRANSACTION
})

const setTransactionMethodFilter = method => ({
  method, 
  type: SET_TRANSACTION_METHOD_FILTER
})


const transactionsReducer = (state = initialState.transactions, action) => {
  switch  (action.type) {
    case ADD_TRANSACTION: 
    // do i need to do a deep clone on action.transaction here before adding it to the transactions array? 
      return [...state, action.transaction]
    default:
      return state;
  }
}

const selectedTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TRANSACTION:
      const index = action.transactionIndex;
      let { transactions } = state
      return ({ 
        ...state,
        selectedTransaction: index >= 0 ? transactions[index] : {}
      });
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


module.exports = {
  transactionsReducer,
  transactionMethodFilterReducer,
  selectedTransactionReducer
}




