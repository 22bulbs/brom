const sampleData = require('../../../sampleData');
import * as types from '../constants/actionTypes';


export const transactions = (state = sampleData, action) => {
  switch  (action.type) {
    case types.ADD_TRANSACTION: 
      return [...state, action.payload]
    default:
      return state;
  }
}

export const selectedTransactionIndex = (state = 0, action) => {
  switch (action.type) {
    case types.SELECT_TRANSACTION:
      return action.payload
    default:
      return state;
  }
}

export const transactionMethodFilter = (state = 'ALL', action) => {
  switch (action.type) {
    case types.SET_TRANSACTION_METHOD_FILTER:
      return action.payload;
    default:
      return state;
  }
}

export const transactionFlagFilter = (state = [], action) => {
  switch (action.type) {
    case types.TOGGLE_TRANSACTION_FLAG:
    const index = state.indexOf(action.payload);
    // if the flag is not already in the flags array, add it.
      if (index) {
        return [...state, action.payload];
      } 
    // but if it is already in the flags array, remove it.
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
}

export const transactionDomainFilter = (state = null, action) => {
  switch (action.type) {
    case types.SET_TRANSACTION_DOMAIN:
      if (state === action.payload) return null;
      return action.payload;
    default:
      return state;
  }
}

