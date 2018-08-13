import React from 'react';


const methodStyle = {
  borderRight: '1px solid black',
  width: '75px',
  textAlign: 'center',
}

const TransactionItem = ({ id, onTransactionClick, method, url, isExternal, flags, isSelected }) => {
  const itemStyle = {
    borderBottom: '1px solid black',
    color: (isSelected) ? 'red' : 'black',
  }

  return (
    <div className="flex-row transaction-item" style={itemStyle} id={id} onClick={() => onTransactionClick(id)}>
      <div className="transaction-item-method" style={methodStyle} >
        <h3>{method}</h3>
      </div>
      <div className="transaction-item-endpoint">
        <p>{url}</p>
        <div className="transaction-item-icons">
          <span>{isExternal}</span> <span>{flags}</span>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
