import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsAccordion from '../components/DetailsAccordion.jsx';

const mapStateToProps = state => ({
  transactions: state.transactions,
  selectedTransactionIndex: state.selectedTransactionIndex
});

const mapDispatchToProps = dispatch => ({

});

const DetailsRequestContainer = ({ transactions, selectedTransactionIndex }) => {
  if (transactions.length === 0) return <div>State is empty.</div>
  
  const selected = transactions[selectedTransactionIndex];

  return (
    <div className='flex-column' id='details-request-container'>
      <div id='request'>
        Request
      </div>
      <div className='flex-column' id='body'>
        Body <br />
        {selected.request.body}
      </div>
      <div id='cookie'>
        Cookie <br />
        {selected.request.cookies}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsRequestContainer);