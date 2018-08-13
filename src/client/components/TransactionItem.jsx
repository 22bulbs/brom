import React from 'react';


const methodStyle = {
  borderRight: '1px solid black',
  width: '75px'
}

const TransactionItem = ({ id, onTransactionClick, method, url, isExternal, flags, isSelected }) => {
  const itemStyle = {
    border: '1px solid black',
    color: (isSelected) ? 'red' : 'black', 
  }

  return (
    <div className="flex-row transaction-item" style={itemStyle} id={id} onClick={() => onTransactionClick(id)}>
      <div className="transaction-item-method" style={methodStyle} >
        <h4>{method}</h4>
      </div>
      <div className="transaction-item-endpoint">
        <p>{url}</p>
        {isExternal} <span>{flags}</span>
      </div>
    </div>
  );
}

export default TransactionItem;