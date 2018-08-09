import React from 'react';


const itemStyle = {
  border: '1px solid black'
}

const methodStyle = {
  borderRight: '1px solid black',
  width: '75px'
}
const TransactionItem = ({ id, onTransactionClick, method, url, isExternal, flags }) =>  (
  <div className="flex-row" style={itemStyle} id={id} onClick={() => onTransactionClick(id)}>
    <div className="transaction-item-method" style={methodStyle}>
      <h4>{method}</h4>
    </div>
    <div className="transaction-item-endpoint">
      <p>{url}</p>
      {isExternal} <span>{flags}</span>
    </div>
  </div>
)

export default TransactionItem;