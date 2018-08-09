import React from 'react';

const flags = ['severe', 'deprecated', 'csp', 'fp', 'redundant', 'conflicting', 'hasBody', 'cookies']

const TransactionFilterBar = ({ onMethodClick, onDomainClick, onFlagClick }) => (

  <div className='flex-row'>
    <div id='method-filter'>
      <select onChange={(e) => onMethodClick(e.target.value)}>
        <option value='ALL'>All</option>
        <option value='GET'>Get</option>
        <option value='POST'>Post</option>
        <option value='PUT'>Put</option>
        <option value='DELETE'>Delete</option>
      </select>
    </div>
    <div id='domain-filter'>
      <span onClick={() => onDomainClick(false)}>
        Internal
      </span>
      <span onClick={() => onDomainClick(true)}>
        External
      </span>
    </div>
    <div id='flag=filter'>
      {flags.map(flag => {
        return (
          <span key={flag} onClick={() => onFlagClick(flag)}>
            {flag}
          </span>
        );
      })}
    </div>
  </div>


);

export default TransactionFilterBar;