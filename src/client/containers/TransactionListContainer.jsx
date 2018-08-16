import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransactionFilterBar from '../components/TransactionFilterBar.jsx';
import TransactionList from '../components/TransactionList.jsx';
import * as actions from '../actions/actions.js';


const filter = (array, method, domain, filterFlags) => {
  let filteredTransactions = array;
  if (method !== 'ALL') {
    filteredTransactions = filteredTransactions.filter(trans => trans.metadata.method === method);
  }
  if (domain !== null) {
    filteredTransactions = filteredTransactions.filter(trans => trans.metadata.external === domain);
  }
  if (filterFlags.length > 0) {
    filteredTransactions = filteredTransactions.filter(trans => {
      const transFlags = trans.metadata.flags;
      return filterFlags.every(flag => transFlags.includes(flag))
    });
  }
  return filteredTransactions;
}

const reverse = (array) => [...array].reverse();

const makeUniqueMethods = array => {
  const list = array.map(transaction => transaction.metadata.method);
  return [...new Set(list)];
}

const mapStateToProps = ({
  transactions,
  selectedTransactionIndex,
  transactionMethodFilter,
  transactionDomainFilter,
  transactionFlagFilter
}) => ({
  selectedTransactionIndex,
  transactionMethodFilter,
  transactionFlagFilter,
  transactionDomainFilter,
  methods: makeUniqueMethods(transactions),
  transactions:
    reverse(
      filter(
      transactions,
      transactionMethodFilter,
      transactionDomainFilter,
      transactionFlagFilter
    )),
});

const mapDispatchToProps = {
  onTransactionClick: actions.selectTransaction,
  onMethodClick: actions.setTransactionMethodFilter,
  onDomainClick: actions.setTransactionDomain,
  onFlagClick: actions.toggleTransactionFlag
}


class TransactionListContainer extends Component {

  render() {
    const {
      transactions,
      selectedTransactionIndex,
      transactionFlagFilter,
      transactionDomainFilter,
      methods,
      onTransactionClick,
      onMethodClick,
      onDomainClick,
      onFlagClick,
    } = this.props;

    return (
      <div className='flex-column' id='transaction-list-container'>
        <TransactionFilterBar
          onMethodClick={onMethodClick}
          onDomainClick={onDomainClick}
          onFlagClick={onFlagClick}
          methods={methods}
          selectedFlags={transactionFlagFilter}
          selectedDomain={transactionDomainFilter}
        />
        <TransactionList
          transactions={transactions}
          onTransactionClick={onTransactionClick}
          selectedTransactionIndex={selectedTransactionIndex}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListContainer);
