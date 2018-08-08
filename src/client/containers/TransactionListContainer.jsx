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
 transactionFlagFilter: state.transactionApiFilter,
 transactionDomainFilter: state.transactionDomainFilter

});

const mapDispatchToProps = dispatch => ({
 selectTransaction: requestName => dispatch(actions.selectTransaction(requestName)),
 setTransactionMethodFilter: methodFilter => dispatch(actions.setTransactionMethodFilter(methodFilter)),
 setTransactionApiFilter: apiFilter => dispatch(actions.setTransactionApiFilter(apiFilter)),
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

   
    return (
      <div className='flex-column' id='transaction-list-container'>
        <TransactionFilterBar />
        <TransactionList transactions={transactions}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListContainer);