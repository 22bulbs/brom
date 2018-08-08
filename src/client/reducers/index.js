import { combineReducers } from 'redux';
import * as reducers from './transactionsReducer'

const reducer = combineReducers({
  transactions: reducers.transactions,
  transactionMethodFilter: reducers.transactionMethodFilter,
  selectedTransactionIndex: reducers.selectedTransactionIndex,
  transactionFlagFilter: reducers.transactionFlagFilter,
  transactionDomainFilter: reducers.transactionDomainFilter
})

export default reducer;