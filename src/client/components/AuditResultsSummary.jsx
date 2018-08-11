import React from 'react';
import DestinationDonut from './DestinationDonut';
import MethodDonut from './MethodDonut';


const AuditResultsSummary = ({ globalData }) => {
  const methods = [];
  for (let method in globalData.methods) {
    let methodObj = {}
    methodObj.x = method;
    methodObj.y = globalData.methods[method];
    methods.push(methodObj)
  }

  return globalData.title ? (
  <div> 
    <div id="port-bar">
      <span>brom</span>
      <span><strong>Application Port:</strong> {globalData['application-port']}  
      <strong>Proxy Port:</strong> {globalData['proxy-port']}  
      <strong>Results Port:</strong> {globalData['results-port']}</span>
      <i>autorenew</i>
    </div>
    <div id="app-title">{globalData.title}</div>
    <p>
      <strong>Protocol: </strong>
      <span>{globalData.protocol}</span>
    </p>
    <div><span>{globalData.totals.transactions}</span> <strong>Transactions</strong></div>
    <p>
      <strong>Severe Vulnerabilities: </strong>
      <span>{globalData.totals.severe}</span>
    </p>
    <p>
      <strong>Deprecated: </strong>
      <span>{globalData.totals.deprecated}</span>
    </p>
    <p>
      <strong>Conflicting: </strong>
      <span>{globalData.totals.conflicting}</span>
    </p>
    <p>
      <strong>Redundant: </strong>
      <span>{globalData.totals.redundant}</span>
    </p>
    <DestinationDonut internal={globalData.totals.internal} external={globalData.totals.external} />
    <MethodDonut methods={methods} />
    
    </div>
) : <div />};

export default AuditResultsSummary;
