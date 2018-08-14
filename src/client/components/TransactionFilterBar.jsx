import React from 'react';
import Icon from './icon';

// const flags = [['severe', 'report'], ['deprecated', 'warning'], ['csp', 'security'], ['fp', 'important_devices'], ['redundant', 'done_all'], ['conflicting', 'compare_arrows'], ['hasBod', 'description']]
const flags = ['severe', 'deprecated', 'conflicting', 'redundant', 'csp', 'fp', 'hasBod']
const makeMethodsList = array => {
  return array.map(method => {
    const lower = method.slice(1).toLowerCase();
    const methodText = method[0].concat(lower);
    return <option key={method} value={method}>{methodText}</option>;
  });
}

const TransactionFilterBar = ({ onMethodClick, onDomainClick, onFlagClick, methods }) => (
  <div className='flex-row space-between'>
    <div className="flex-row">
      <div id='method-filter'>
        <select onChange={(e) => onMethodClick(e.target.value)}>
          <option selected disabled>Method</option>
          <option value='ALL'>All</option>
          {makeMethodsList(methods)}
        </select>
      </div>
      <div id='domain-filter'>
        <span onClick={() => onDomainClick(false)}>
          <Icon flag="internal" />
        </span>
        <span onClick={() => onDomainClick(true)}>
          <Icon flag="external" />
        </span>
      </div>
    </div>
    <div id='flag-filter'>
      {flags.map(flag => {
        return (
          <span key={flag} onClick={() => onFlagClick(flag)}>
            <Icon flag={flag} />
          </span>
        );
      })}
    </div>
  </div>


);



export default TransactionFilterBar;
