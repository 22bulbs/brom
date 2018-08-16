import React from 'react';
import Icon from './Icon';
import colorMap from '../utils/colorMap'


const TransactionItem = ({ id, onTransactionClick, method, url, isExternal, flags, isSelected }) => {
  const itemStyle = {
    borderBottom: '1px solid #69686f',
    backgroundColor: (isSelected) ? '#5C5A63' : '#3d3c42',
  }

  const methodStyle = {
    borderRight: '1px solid #69686f',
    width: '75px',
    textAlign: 'center',
    backgroundColor: colorMap(method),
    color: 'black'
  }

  return (
    <div className="flex-row transaction-item" style={itemStyle} id={id} onClick={() => onTransactionClick(id)}>
      <div className="transaction-item-method" style={methodStyle} >
        <h3>{method}</h3>
      </div>
      <div className="transaction-item-endpoint">
        <p>{url}</p>
        <div className="transaction-item-icons">
          <span>
            <Icon flag={isExternal} />
          </span> 
          <span className="item-flags">
            {flags.map(flag => {
              return (
                <span key={flag}>
                  <Icon flag={flag} />
                </span>
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
