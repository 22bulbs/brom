import { combineReducers } from 'redux';
import * as reducers from './transactionsReducer'
import { globalDataReducer } from './globalDataReducer'

const reducer = combineReducers({
  transactions: reducers.transactions,
  transactionMethodFilter: reducers.transactionMethodFilter,
  selectedTransactionIndex: reducers.selectedTransactionIndex,
  transactionFlagFilter: reducers.transactionFlagFilter,
  transactionDomainFilter: reducers.transactionDomainFilter,
  globalData: globalDataReducer
})

export default reducer;