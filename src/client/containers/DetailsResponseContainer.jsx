import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsAccordion from '../components/DetailsAccordion.jsx';

const mapStateToProps = state => ({
  transactions: state.transactions,
  selectedTransactionIndex: state.selectedTransactionIndex
});

const mapDispatchToProps = dispatch => ({

});

const DetailsResponseContainer = ({ transactions, selectedTransactionIndex }) => {

  if (transactions.length === 0) return <div>State is empty.</div>

  const selected = transactions[selectedTransactionIndex];
  return (
    <div className='flex-column' id='details-response-container'>
      Response
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsResponseContainer);
