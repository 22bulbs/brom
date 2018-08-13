import React from 'react';
import TransactionItem from './TransactionItem'; 


const TransactionList = ({ transactions, selectedTransactionIndex, onTransactionClick }) => {
  const list = transactions.map((trans, index) => {
    return (
      <TransactionItem 
        method={trans.metadata.method}
        url={trans.metadata.url}
        isExternal={trans.metadata.external ? 'External' : 'Internal'}
        flags={trans.metadata.flags.join(' ')}
        key={`trans${index}`}
        id={trans.id}
        isSelected={(selectedTransactionIndex === trans.id)}
        onTransactionClick={onTransactionClick}
      />
    )
  });
  return (
    <div id="transaction-list">
      {list}
    </div>
  )
  };


export default TransactionList;




