import React from 'react';
import * as types from '../constants/actionTypes';

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
      <span 
        onClick={() => props.onDomainClick(false)}
      >Internal</span>
      <span 
        onClick={() => props.onDomainClick(true)}
        >External</span>
    </div>
  </div>


);

export default TransactionFilterBar;