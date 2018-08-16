import React from 'react';
import Icon from './Icon';


const flags = ['severe', 'deprecated', 'conflicting', 'redundant', 'csp', 'fp', 'hasBody'];
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
  selectedFlags,
  selectedDomain
}) => (
  <div className="flex-row space-between transaction-filter light-bg">
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
        <span style={{
          color: selectedDomain === true || null ? "#BFB7AC" : "#fff4e5"
        }} onClick={() => onDomainClick(false)}>
          <Icon flag="internal" />
        </span>
        <span style={{
          color: selectedDomain === false || null ? "#BFB7AC" : "#fff4e5"
        }} onClick={() => onDomainClick(true)}>
          <Icon flag="external" />
        </span>
      </div>
    </div>
    <div id="flag-filter">
      {flags.map(flag => {
        const selectStatus = {
          color: selectedFlags.includes(flag) ? "#fff4e5" : "#BFB7AC"
        }
        return (
        <span style={selectStatus} key={flag} onClick={() => onFlagClick(flag)}>
          <Icon  flag={flag} />
        </span>
        )})}
    </div>
  </div>


);


export default TransactionFilterBar;
