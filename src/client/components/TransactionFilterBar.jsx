import React from 'react';
import Icon from './Icon';

const flags = ['severe', 'deprecated', 'conflicting', 'redundant', 'csp', 'fp', 'hasBod'];
const makeMethodsList = array => array.map((method) => {
  const lower = method.slice(1).toLowerCase();
  const methodText = method[0].concat(lower);
  return <option key={method} value={method}>{methodText}</option>;
});

const TransactionFilterBar = ({
  onMethodClick,
  onDomainClick,
  onFlagClick,
  methods,
}) => (
  <div className="flex-row space-between">
    <div className="flex-row">
      <div id="method-filter">
        <select
          defaultValue=""
          onChange={e => onMethodClick(e.target.value)}
        >
          <option value="" disabled>Method</option>
          <option value="ALL">All</option>
          {makeMethodsList(methods)}
        </select>
      </div>
      <div id="domain-filter">
        <span onClick={() => onDomainClick(false)}>
          <Icon flag="internal" />
        </span>
        <span onClick={() => onDomainClick(true)}>
          <Icon flag="external" />
        </span>
      </div>
    </div>
    <div id="flag-filter">
      {flags.map(flag => (
        <span key={flag} onClick={() => onFlagClick(flag)}>
          <Icon flag={flag} />
        </span>
        ))}
    </div>
  </div>


);


export default TransactionFilterBar;
