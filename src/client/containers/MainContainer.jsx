import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuditResultsSummary from '../components/AuditResultsSummary.jsx';
import TransactionDetailsContainer from './TransactionDetailsContainer.jsx';
import TransactionListContainer from './TransactionListContainer.jsx';
import DetailsTransactionSummary from '../components/DetailsTransactionSummary.jsx';

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({

});

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='main-container'>
        <div className='flex-column' id='left-hand-side'>
          <AuditResultsSummary />
          <TransactionListContainer />
        </div>
        <div className='flex-column' id='right-hand-side'>
          <DetailsTransactionSummary />
          <TransactionDetailsContainer />
        </div>
      </div>

    )
  }
}

