import React from 'react';
import { connect } from 'react-redux';
import AuditResultsSummary from '../components/AuditResultsSummary.jsx';
import TransactionDetailsContainer from './TransactionDetailsContainer.jsx';
import TransactionListContainer from './TransactionListContainer.jsx';
import DetailsTransactionSummary from '../components/DetailsTransactionSummary.jsx';
import { addTransaction } from '../actions/actions';


const mapStateToProps = ({
  transactions,
  selectedTransactionIndex,
  globalData,
  socketStatus
 }) => ({
  transactions,
  selectedTransactionIndex,
  globalData,
  socketStatus,
});

// const mapDispatchToProps = dispatch => ({
//   addTransaction: requestName => dispatch(addTransaction(requestName))
// });

const mapDispatchToProps = {
  addTransaction,
}

const MainContainer = ({ transactions, selectedTransactionIndex, globalData, socketStatus }) => {

  const selectedTransaction = transactions[selectedTransactionIndex];

  return (
    <div id='main-container'>
      <div className='flex-column' id='left-hand-side'>
        <AuditResultsSummary {...globalData} socketStatus={socketStatus} />
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
