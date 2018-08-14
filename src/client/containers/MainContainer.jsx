import React from 'react';
import { connect } from 'react-redux';
import AuditResultsSummary from '../components/AuditResultsSummary.jsx';
import TransactionDetailsContainer from './TransactionDetailsContainer.jsx';
import TransactionListContainer from './TransactionListContainer.jsx';
import DetailsTransactionSummary from '../components/DetailsTransactionSummary.jsx';
import { addTransaction } from '../actions/actions';


// will add new 'meta' key on state, and definitely pass as props into this container later
const mapStateToProps = state => ({
  transactions: state.transactions,
  selectedTransactionIndex: state.selectedTransactionIndex,
  globalData: state.globalData
});

const mapDispatchToProps = dispatch => ({
  addTransaction: requestName => dispatch(addTransaction(requestName))
});



const MainContainer = ({ transactions, selectedTransactionIndex, globalData }) => {

  const selectedTransaction = transactions[selectedTransactionIndex];

  return (
    <div id='main-container'>
      <div className='flex-column' id='left-hand-side'>
        <AuditResultsSummary {...globalData} />
        <TransactionListContainer />
      </div>
      <div className='flex-column' id='right-hand-side'>
        <DetailsTransactionSummary selectedTransaction={selectedTransaction} />
        <TransactionDetailsContainer />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
