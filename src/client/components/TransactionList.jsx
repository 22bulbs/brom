import React from 'react';
import TransactionItem from './TransactionItem'; 

const TransactionList = props => {
  const list = props.transactions.map((trans, index) => {
    return (
      <TransactionItem 
      method={trans.metadata.method}
      url={trans.metadata.url}
      isExternal={trans.metadata.external ? 'External' : 'Internal'}
      flags={trans.metadata.flags.join(' ')}
      key={`trans${index}`}
      index={index}
      />
    )
  })
  return (
    <div id="transaction-list">
      {list}
    </div>
  )
  };


export default TransactionList;




