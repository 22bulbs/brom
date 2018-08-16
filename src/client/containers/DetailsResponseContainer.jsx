import React from 'react';
import { connect } from 'react-redux';
import DetailsAccordion from '../components/DetailsAccordion';
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

const DetailsResponseContainer = ({ count, selected }) => {
  const { response } = selected;

  const hasCSP = objectHasKey(response, 'contentSecurityPolicy');
  const hasFP = objectHasKey(response, 'featurePolicy');
  const hasSetCookie = objectHasKey(response, 'setCookie');
  const hasCookies = objectHasKey(response, 'cookies');

  return count > 0 && (
    <div className='flex-column' id='details-response-container'>
      <div className="border-bottom light-bg" id='response'><p><strong>Response</strong></p></div>
      {hasCSP &&
        <CSPDisplay policy={response.contentSecurityPolicy} />}
      {hasFP &&
        <FPDisplay policy={response.featurePolicy} />}
      {hasSetCookie &&
        <SetCookieDisplay policy={response.setCookie} />}
      {hasCookies &&
        <CookiesDisplay cookies={response.cookies} />}
      {mapOverHeaders(response.headers)}
      <SimpleAccordion title="Body" value={JSON.stringify(response.body)} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsResponseContainer);
