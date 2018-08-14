import React from 'react';

const DetailsTransactionSummary = ({ selectedTransaction }) => {

  if (!selectedTransaction) {
    return (
      <h3>No transactions yet! Visit your site to start recording.</h3>
    );
  }
  const flags = selectedTransaction.metadata.flags.map(flag => {
    return (
      flag
    )
  }).join(' ');

  return (
    <div id="details-transaction-summary" className="flex-column">
      <div id="internal-external-dts">
        {selectedTransaction.metadata.external ? 'External' : 'Internal'}
      </div>
      <div className="method">
        <h1>{selectedTransaction.metadata.method} </h1>
      </div>
      <div className="flex-row space-between route">
        <div>{selectedTransaction.metadata.url}</div>
        <div>{flags}</div>

      </div>
    </div>
  )
};

export default DetailsTransactionSummary;


