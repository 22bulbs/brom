
import * as types from '../constants/actionTypes'

export const addTransaction = transaction => ({
  type: types.ADD_TRANSACTION,
  payload: transaction
});

export const selectTransaction = id => ({
  type: types.SELECT_TRANSACTION,
  payload: id
});

export const setTransactionMethodFilter = method => ({
  type: types.SET_TRANSACTION_METHOD_FILTER,
  payload: method
});


export const toggleTransactionFlag = flag => ({
  type: types.TOGGLE_TRANSACTION_FLAG,
  payload: flag
});

export const setTransactionDomain = domain => ({
  type: types.SET_TRANSACTION_DOMAIN,
  payload: domain
});

export const updateGlobalData = data => ({
  type:types.UPDATE_GLOBAL_DATA,
  payload: data
});

export const setSocketStatus = bool => ({
  type: types.SET_SOCKET_STATUS,
  payload: bool
});