import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsTransactionSummary from '../components/DetailsTransactionSummary.jsx';
import DetailsRequestContainer from './DetailsRequestContainer.jsx';
import DetailsResponseContainer from './DetailsResponseContainer.jsx';


const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({

});

export default class TransactionDetailsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id='transaction-details-container'>
        <DetailsRequestContainer />
        <DetailsResponseContainer />
      </div>  
    )
  }
}