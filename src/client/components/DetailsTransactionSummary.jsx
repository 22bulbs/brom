import React from 'react';

const DetailsTransactionSummary = ({ selectedTransaction }) => {
  const flags = selectedTransaction.metadata.flags.map(flag => {
    return (
      flag
    )
  }).join(' ');

  const pTagStyle = {
    display: 'inline',
    color: 'blue',
    backgroundColor: 'gray'
  }
  const bottomRowStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  
  return (
    <div id="details-transaction-summary" className="flex-column">
      <div className="icon" id="internal-external-dts">
        <p style={pTagStyle}>{selectedTransaction.metadata.external ? 'External' : 'Internal'}</p>
      </div>
      <div className="method">
        <h1>{selectedTransaction.metadata.method} </h1>
      </div>
      <div className="route" style={bottomRowStyle}>
        {selectedTransaction.metadata.url} {flags}
        
      </div>
    </div>
  )
};

export default DetailsTransactionSummary;


