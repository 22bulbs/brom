import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransactionFilterBar from '../components/TransactionFilterBar.jsx';
import TransactionList from '../components/TransactionList.jsx';

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({

});

export default class TransactionListContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='transactionListContainer'>
        <TransactionFilterBar />
        <TransactionList />
      </div>
    )
  }
}