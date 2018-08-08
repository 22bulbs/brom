import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuditResultsSummary from '../components/AuditResultsSummary.jsx';
import TransactionDetailsContainer from './TransactionDetailsContainer.jsx';
import TransactionListContainer from './TransactionListContainer.jsx';
import DetailsTransactionSummary from '../components/DetailsTransactionSummary.jsx';
import { addTransaction } from '../actions/actions';

const mapStateToProps = store => store;

const mapDispatchToProps = dispatch => ({
  addTransaction: requestName => dispatch(addTransaction(requestName))

});

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { transactions,
            transactionMethodFilter,
            selectedTransactionIndex,
            transactionApiFilter,
            transactionFlagFilter,
            transactionDomainFilter } = this.props;

    const selectedTransaction = transactions[selectedTransactionIndex];

    return (
      <div id='main-container'>
        <div className='flex-column' id='left-hand-side'>
          <AuditResultsSummary />
          <TransactionListContainer />
        </div>
        <div className='flex-column' id='right-hand-side'>
          <DetailsTransactionSummary selectedTransaction={selectedTransaction} />
          <TransactionDetailsContainer/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)