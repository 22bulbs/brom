import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsTransactionSummary from '../components/DetailsTransactionSummary.jsx';
import DetailsRequestContainer from './DetailsRequestContainer.jsx';
import DetailsResponseContainer from './DetailsResponseContainer.jsx';
import WarningsAccordion from '../components/DetailsAccordion';

const mapStateToProps = state => ({
  transactions: state.transactions,
  selectedTransactionIndex: state.selectedTransactionIndex
});

const mapDispatchToProps = dispatch => ({
 
});


const TransactionDetailsContainer = ({ transactions, selectedTransactionIndex }) => {

  if (transactions.length === 0) return <div>State empty</div>

  const selected = transactions[selectedTransactionIndex];

  return (
    <div id='transaction-details-container' className="flex-row">
      <div id='warnings'>
        Warning
        <WarningsAccordion text={JSON.stringify(selected.warnings.res)} id="warnings" />
      </div>
      <DetailsRequestContainer />
      <DetailsResponseContainer />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailsContainer)
