import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransactionFilterBar from '../components/TransactionFilterBar.jsx';
import TransactionList from '../components/TransactionList.jsx';
import TransactionItem from '../components/TransactionItem.jsx';
import { bindActionCreators } from '../../../node_modules/redux';
import * as actions from '../actions/actions.js';
import { METHODS } from 'http';



const mapStateToProps = state => ({
 transactions: state.transactions,
 selectedTransactionIndex: state.selectedTransactionIndex,
 transactionMethodFilter: state.transactionMethodFilter,
 transactionFlagFilter: state.transactionFlagFilter,
 transactionDomainFilter: state.transactionDomainFilter
});



const mapDispatchToProps = dispatch => ({
  // fix selectTransaction to include some sort of permanent id property for all the transactions
 onTransactionClick: id => dispatch(actions.selectTransaction(id)),
 onMethodClick: method => dispatch(actions.setTransactionMethodFilter(method)),
 onDomainClick: domain => dispatch(actions.setTransactionDomain(domain)),
 onFlagClick: flag => dispatch(actions.toggleTransactionFlag(flag))
});

class TransactionListContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      selectedTransactionIndex,
      transactionMethodFilter,
      transactionFlagFilter,
      transactionDomainFilter,
      onTransactionClick,
      onMethodClick,
      onDomainClick,
      onFlagClick
    } = this.props;
    let { transactions } = this.props;

    const makeMethodsList = (array) => {
      const list = array.map((transaction) => transaction.metadata.method);
      return [...new Set(list)].map(method => {
        const lower = method.slice(1).toLowerCase();
        const methodText = method[0].concat(lower);
        return <option key={method} value={method}>{methodText}</option>
      });    
    }
    const filter = (array) => {
      let filteredTransactions = array;
      if (transactionMethodFilter !== 'ALL') {
        filteredTransactions =  filteredTransactions.filter(trans => trans.metadata.method === transactionMethodFilter);
      }
      if (transactionFlagFilter.length > 0) {
        filteredTransactions = filteredTransactions.filter(trans => {
          const { flags }  = trans.metadata;
          for (const flag of flags) {
            if (transactionFlagFilter.includes(flag)) return true;
          }
          return false;
        });
      }
      if (transactionDomainFilter !== null) {
        filteredTransactions = filteredTransactions.filter(trans => trans.metadata.external === transactionDomainFilter);
      }
      return filteredTransactions;
    }
    const reverse = (array) => [...array].reverse();

    const methods = makeMethodsList(transactions);
    transactions = reverse(filter(transactions));
    
    
    return (
      <div className='flex-column' id='transaction-list-container'>
        <TransactionFilterBar 
          onMethodClick={onMethodClick}
          onDomainClick={onDomainClick}
          onFlagClick={onFlagClick}
          methods={methods}
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