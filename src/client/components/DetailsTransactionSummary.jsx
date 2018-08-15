import React from 'react';
import Icon from './Icon'
import colorMap from '../utils/colorMap'

const DetailsTransactionSummary = ({ selectedTransaction }) => {

  if (!selectedTransaction) {
    return (
      <h3>No transactions yet! Visit your site to start recording.</h3>
    );
  }
  const flags = selectedTransaction.metadata.flags

  return (
    <div id="details-transaction-summary" className="flex-column" style={{ borderColor: colorMap(selectedTransaction.metadata.method)}}>
      <div id="internal-external-dts">
        <Icon flag={selectedTransaction.metadata.external ? 'external' : 'internal'} />
      </div>
      <div className="method">
        <h1>{selectedTransaction.metadata.method} </h1>
      </div>
      <div className="flex-row space-between route">
        <div>{selectedTransaction.metadata.url}</div>
        <div>{flags.map(flag => {
        return (
          <span key={flag}>
            <Icon flag={flag} />
          </span>
        );
        })}
        </div>

      </div>
    </div>
  )
};

export default DetailsTransactionSummary;


