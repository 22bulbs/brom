import React from 'react';
import * as types from '../constants/actionTypes';

const methods = ['ALL', 'GET', 'POST', 'PUT', 'DELETE'];

const TransactionFilterBar = props => (

  <div className='flex-row'>
    <div id='method-filter'>
      <select onChange={(e) => props.onMethodClick(e.target.value)}>
        <option value='ALL'>All</option>
        <option value='GET'>Get</option>
        <option value='POST'>Post</option>
        <option value='PUT'>Put</option>
        <option value='DELETE'>Delete</option>
      </select>
    </div>
    <div id='domain-filter'>
      <select>
      </select>
    </div>
  </div>


);

export default TransactionFilterBar;