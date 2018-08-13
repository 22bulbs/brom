import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsAccordion from '../components/DetailsAccordion.jsx';

const mapStateToProps = state => ({
  count: state.transactions.length,
  selected: state.transactions[state.selectedTransactionIndex]
});

const mapDispatchToProps = dispatch => ({

});

const DetailsResponseContainer = ({ count, selected }) => {

  return count > 0 && (
    <div className='flex-column' id='details-response-container'>
      Response
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsResponseContainer);
