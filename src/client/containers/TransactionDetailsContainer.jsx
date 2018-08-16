import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsTransactionSummary from '../components/DetailsTransactionSummary.jsx';
import DetailsRequestContainer from './DetailsRequestContainer.jsx';
import DetailsResponseContainer from './DetailsResponseContainer.jsx';
import WarningsAccordion from '../components/WarningsAccordion';


const mapStateToProps = state => ({
  count: state.transactions.length,
  selected: state.transactions[state.selectedTransactionIndex]
});

const mapDispatchToProps = dispatch => ({

});

const TransactionDetailsContainer = ({ count, selected }) => {

  return count > 0 && (
    <div className="flex-column">
      <div id='warnings-accordion' className='light-bg'>
        <h3 style={{ margin: '.5em 0' }} className='warnings-text'>Warnings</h3>
        <WarningsAccordion
          textObject={selected.warnings.res}
          id="warnings"
        />
      </div>
      <div id='transaction-details-container' className="flex-row">
        <DetailsRequestContainer />
        <DetailsResponseContainer />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailsContainer)
