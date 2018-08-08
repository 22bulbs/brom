import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsAccordion from '../components/DetailsAccordion.jsx';

const mapStateToProps = store => ({
  transactions: state.transactions,
  selectedTransactionIndex: state.selectedTransactionIndex
});

const mapDispatchToProps = dispatch => ({

});

export default class DetailsResponseContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='flex-column' id='details-response-container'>
        Response
      </div>
    )
  }
}
