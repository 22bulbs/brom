import React from 'react';

const flags = ['severe', 'deprecated', 'csp', 'fp', 'redundant', 'conflicting', 'hasBody', 'cookies'];
const makeMethodsList = array => {
  return array.map(method => {
    const lower = method.slice(1).toLowerCase();
    const methodText = method[0].concat(lower);
    return <option key={method} value={method}>{methodText}</option>;
  });
}

const TransactionFilterBar = ({ onMethodClick, onDomainClick, onFlagClick, methods }) => (
  <div className='flex-row'>
    <div id='method-filter'>
      <select onChange={(e) => onMethodClick(e.target.value)}>
        <option value='ALL'>All</option>
        {makeMethodsList(methods)}
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