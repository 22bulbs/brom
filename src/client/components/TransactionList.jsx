import React from 'react';
import TransactionItem from './TransactionItem';


const TransactionList = ({ transactions, selectedTransactionIndex, onTransactionClick }) => {
  const list = transactions.map((trans, index) => {
    return (
      <TransactionItem
        method={trans.metadata.method}
        url={trans.metadata.url}
        isExternal={trans.metadata.external ? 'external' : 'internal'}
        flags={trans.metadata.flags}
        key={`trans${index}`}
        id={trans.id}
        isSelected={(selectedTransactionIndex === trans.id)}
        onTransactionClick={onTransactionClick}
      />
    )
  });
  return (
    <div
      id="transaction-list"
      style={{
        borderTop: '1px solid #69686f',
        borderBottom: 0,
      }}
    >
      {list}
    </div>
  )
  };


export default TransactionList;




