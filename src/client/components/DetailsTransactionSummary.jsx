import React from 'react';

const DetailsTransactionSummary = ({ selectedTransaction }) => {
  
  if (!selectedTransaction) return (
    <div>State is Empty. Try Again Later.</div>
  )
  const flags = selectedTransaction.metadata.flags.map(flag => {
    return (
      flag
    )
  }).join(' ');

  const pTagStyle = {
    display: 'inline'
  }
  const bottomRowStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  
  return (
    <div id="details-transaction-summary" className="flex-column">
      <div id="internal-external-dts">
        {selectedTransaction.metadata.external ? 'External' : 'Internal'}
      </div>
      <div className="method">
        <h1>{selectedTransaction.metadata.method} </h1>
      </div>
      <div className="route">
        {selectedTransaction.metadata.url} {flags}
        
      </div>
    </div>
  )
};

export default DetailsTransactionSummary;


