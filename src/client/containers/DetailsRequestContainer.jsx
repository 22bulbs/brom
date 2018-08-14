import React from 'react';
import { connect } from 'react-redux';
import SimpleAccordion from '../components/SimpleAccordion';
import CSPDisplay from '../components/CSPDisplay';
import FPDisplay from '../components/FPDisplay';
import SetCookieDisplay from '../components/SetCookieDisplay';
import CookiesDisplay from '../components/CookiesDisplay';
import objectHasKey from '../utils/objectHasKey';

const upCase = string => string.replace(
  /\b\w/g,
  match => match.toUpperCase(),
);

const mapStateToProps = state => ({
  count: state.transactions.length,
  selected: state.transactions[state.selectedTransactionIndex]
});

const mapDispatchToProps = dispatch => ({

});

const mapOverHeaders = headers =>
  Object.keys(headers).map(el => (
    <SimpleAccordion
      key={upCase(el)}
      title={upCase(el)}
      value={headers[el]}
    />));

const DetailsRequestContainer = ({ count, selected }) => {
  const { request } = selected;

  const hasCSP = objectHasKey(request, 'contentSecurityPolicy');
  const hasFP = objectHasKey(request, 'featurePolicy');
  const hasSetCookie = objectHasKey(request, 'setCookie');
  const hasCookies = objectHasKey(request, 'cookies');

  return count > 0 && (
    <div className='flex-column border-right' id='details-request-container'>
      <p className="border-bottom" id='request'><strong>Request</strong></p>
      {hasCSP &&
        <CSPDisplay policy={request.contentSecurityPolicy} />}
      {hasFP &&
        <FPDisplay policy={request.featurePolicy} />}
      {hasSetCookie &&
        <SetCookieDisplay policy={request.setCookie} />}
      {hasCookies &&
        <CookiesDisplay cookies={request.cookies} />}
      {mapOverHeaders(request.headers)}
      <SimpleAccordion title="Body" value={JSON.stringify(request.body)} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsRequestContainer);
