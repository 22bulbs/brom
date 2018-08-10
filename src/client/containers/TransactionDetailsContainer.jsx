import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsTransactionSummary from '../components/DetailsTransactionSummary.jsx';
import DetailsRequestContainer from './DetailsRequestContainer.jsx';
import DetailsResponseContainer from './DetailsResponseContainer.jsx';
import { bindActionCreators } from '../../../../../../Library/Caches/typescript/2.9/node_modules/redux';
import * as actions from '../actions/actions'

const mapStateToProps = state => ({
  transactions: state.transactions,
  selectedTransactionIndex: state.selectedTransactionIndex
});

const mapDispatchToProps = dispatch => ({
 
});

class TransactionDetailsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const transactions = this.props.transactions[this.props.selectedTransactionIndex];
    if (!transactions) return <div>State empty</div>
    return(
      <div id='transaction-details-container' className="flex-row">
        <div id='warning'>
        Warning
        {JSON.stringify(transactions.warnings.res)}
        </div>
        <DetailsRequestContainer />
        <DetailsResponseContainer />
      </div>  
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailsContainer)