import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsTransactionSummary from '../components/DetailsTransactionSummary.jsx';
import DetailsRequestContainer from './DetailsRequestContainer.jsx';
import DetailsResponseContainer from './DetailsResponseContainer.jsx';
import WarningsAccordion from '../components/DetailsAccordion';


const mapStateToProps = state => ({
  count: state.transactions.length,
  selected: state.transactions[state.selectedTransactionIndex]
});

const mapDispatchToProps = dispatch => ({

});

const TransactionDetailsContainer = ({ count, selected }) => {

  return count > 0 && (
    <div>
      <div id='warnings'>
        Warning
        <WarningsAccordion text={JSON.stringify(selected.warnings.res)} id="warnings" />
      </div>
      <div id='transaction-details-container' className="flex-row">
        <DetailsRequestContainer />
        <DetailsResponseContainer />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailsContainer)
