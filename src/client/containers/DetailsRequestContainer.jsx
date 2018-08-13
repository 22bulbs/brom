import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsAccordion from '../components/DetailsAccordion.jsx';

const mapStateToProps = state => ({
  count: state.transactions.length,
  selected: state.transactions[state.selectedTransactionIndex]
});

const mapDispatchToProps = dispatch => ({

});

const DetailsRequestContainer = ({ count, selected }) => {

  return count > 0 && (
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