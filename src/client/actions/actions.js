
import * as types from '../constants/actionTypes'

export const addTransaction = transaction => ({
  type: types.ADD_TRANSACTION,
  payload: transaction
})

export const selectTransaction = transactionIndex => ({
  type: types.SELECT_TRANSACTION,
  payload: transactionIndex
})

export const setTransactionMethodFilter = method => ({
  type: types.SET_TRANSACTION_METHOD_FILTER,
  payload: method
})

export const setTransactionApiFilter = api => ({
  type: types.SET_TRANSACTION_API_FILTER,
  payload: api
})

export const setTransactionFlagFilter = flag => ({
  type: types.SET_TRANSACTION_FLAG_FILTER,
  payload: flag
}) 

export const setTransactionDomainFilter = domain => ({
  type: types.SET_TRANSACTION_DOMAIN_FILTER,
  payload: domain
})