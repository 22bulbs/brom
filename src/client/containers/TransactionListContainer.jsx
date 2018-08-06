import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransactionFilterBar from '../components/TransactionFilterBar.jsx';
import TransactionList from '../components/TransactionList.jsx';
import { bindActionCreators } from '../../../node_modules/redux';
import addTransaction as action from '../actions/actions.js';

const mapStateToProps = store => ({
 
});

const mapDispatchToProps = dispatch => ({
 addTransaction: requestName => dispatch(actions.addTransaction(requestName))
});

export default class TransactionListContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='flex-column' id='transaction-list-container'>
        <TransactionFilterBar />
        <TransactionList />
      </div>
    )
  }
}