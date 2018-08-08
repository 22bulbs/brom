import React from 'react';


const itemStyle = {
  border: '1px solid black'
}

const methodStyle = {
  borderRight: '1px solid black',
  width: '75px'
}
const TransactionItem = props => (
  <div className="flex-row" style={itemStyle}>
    <div className="transaction-item-method" style={methodStyle}>
    <h4>{props.method}</h4>
    </div>
    <div className="transaction-item-endpoint">
    <p>{props.url}</p>
    {props.isExternal} <span>{props.flags}</span>
    </div>
  </div>
);

export default TransactionItem;