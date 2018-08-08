import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransactionFilterBar from '../components/TransactionFilterBar.jsx';
import TransactionList from '../components/TransactionList.jsx';
import TransactionItem from '../components/TransactionItem.jsx';
import { bindActionCreators } from '../../../node_modules/redux';
import * as actions from '../actions/actions.js';



const mapStateToProps = state => ({
 transactions: state.transactions,
 transactionMethodFilter: state.transactionMethodFilter,
 transactionFlagFilter: state.transactionFlagFilter,
 transactionDomainFilter: state.transactionDomainFilter

});

const mapDispatchToProps = dispatch => ({
 selectTransaction: requestName => dispatch(actions.selectTransaction(requestName)),
 setTransactionMethodFilter: methodFilter => dispatch(actions.setTransactionMethodFilter(methodFilter)),
 setTransactionDomainFilter: domainFilter => dispatch(actions.setTransactionDomainFilter(domainFilter)),
 setTransactionFlagFilter: flagFilter => dispatch(actions.setTransactionFlagFilter(flagFilter))
});

class TransactionListContainer extends Component {
  constructor(props) {
    super(props);
    
  }

 
  render() {
    const {
    transactions,
      transactionMethodFilter,
      transactionFlagFilter,
      transactionDomainFilter
    } = this.props;

    
    const filter = (array) => {
      let filteredTransactions = array;
      if (transactionMethodFilter !== 'ALL') {
        filteredTransactions =  filteredTransactions.filter(x => x.metadata.method === transactionMethodFilter);
      }
      if (transactionFlagFilter.length > 0) {
        filteredTransactions = filteredTransactions.filter(x => {
          const { flags }  = x.metadata;
          for (const flag of flags) {
            if (transactionFlagFilter.includes(flag)) return true;
          }
          return false;
        });
      }
      if (transactionDomainFilter !== null) {
        filteredTransactions = filteredTransactions.filter(x => x.metadata.external === transactionDomainFilter);
      }
      return filteredTransactions;
    }
    
    
    return (
      <div className='flex-column' id='transaction-list-container'>
        <TransactionFilterBar />
        <TransactionList transactions={filter(transactions)}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListContainer);