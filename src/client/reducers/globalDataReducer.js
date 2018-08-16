import * as types from '../constants/actionTypes';

export const globalDataReducer = (state = {}, action) => {
  switch  (action.type) {
    case types.UPDATE_GLOBAL_DATA: 
      return action.payload;
    default:
      return state;
  }
} 