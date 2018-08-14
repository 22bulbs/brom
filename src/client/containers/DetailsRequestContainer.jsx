import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsAccordion from '../components/DetailsAccordion';
import SimpleHeaderDisplay from '../components/SimpleHeaderDisplay';
import objectHasKey from '../utils/objectHasKey';

const mapStateToProps = state => ({
  count: state.transactions.length,
  selected: state.transactions[state.selectedTransactionIndex]
});

const mapDispatchToProps = dispatch => ({

});

const mapOverHeaders = headers =>
  Object.keys(headers).map(el =>
    <SimpleHeaderDisplay header={el} value={headers[el]} />);

const DetailsRequestContainer = ({ count, selected }) => {
  const { request } = selected;

  const hasCSP = objectHasKey(request, 'contentSecurityPolicy');
  const hasFP = objectHasKey(request, 'featurePolicy');
  const hasSetCookie = objectHasKey(request, 'setCookie');
  const hasCookies = objectHasKey(request, 'cookies');

  return count > 0 && (
    <div className='flex-column' id='details-request-container'>
      <div id='request'>
        Request
      </div>
      {hasCSP && <p>CSP</p>}
      {hasFP && <p>FP</p>}
      {hasSetCookie && <p>SetCookie</p>}
      {hasCookies && <p>Cookies</p>}
      {mapOverHeaders(request.headers)}
      <div className='flex-column' id='body'>
        Body <br />
        {request.body}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsRequestContainer);
