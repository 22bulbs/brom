import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsAccordion from '../components/DetailsAccordion.jsx';

const mapStateToProps = state => ({
  transactions: state.transactions,
  selectedTransactionIndex: state.selectedTransactionIndex
});

const mapDispatchToProps = dispatch => ({

});

class DetailsRequestContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.transactions.length === 0) return (
      <div>State is empty. Try again later</div>
    )
    return (
    <div className='flex-column' id='details-request-container'>
      <div id='request'>
        Request
      </div>
        <div className='flex-column' id='body'>
          Body <br/>
    {this.props.transactions[this.props.selectedTransactionIndex].request.body}
        </div>
        <div id='cookie'>
        Cookie <br/>
        {this.props.transactions[this.props.selectedTransactionIndex].request.cookies}
        </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsRequestContainer);