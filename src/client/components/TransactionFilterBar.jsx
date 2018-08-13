import React from 'react';


const flags = [['severe', 'report'], ['deprecated', 'warning'], ['csp', 'security'], ['fp', 'important_devices'], ['redundant', 'done_all'], ['conflicting', 'compare_arrows'], ['hasBod', 'description']]
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
        <i className="material-icons">storage</i>
      </span>
      <span onClick={() => onDomainClick(true)}>
        <i className="material-icons">public</i>
      </span>
    </div>
    <div id='flag=filter'>
      {flags.map(flag => {
        return (
          <span key={flag[0]} onClick={() => onFlagClick(flag[0])}>
            <i className="material-icons">
            {flag[1]}
            </i>
          </span>
        );
      })}
    </div>
  </div>


);



export default TransactionFilterBar;