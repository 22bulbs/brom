import React from 'react';
import { connect } from 'react-redux';
import DetailsAccordion from '../components/DetailsAccordion.jsx';
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

const DetailsResponseContainer = ({ count, selected }) => {
  const { response } = selected;

  const hasCSP = objectHasKey(response, 'contentSecurityPolicy');
  const hasFP = objectHasKey(response, 'featurePolicy');
  const hasSetCookie = objectHasKey(response, 'setCookie');
  const hasCookies = objectHasKey(response, 'cookies');

  return count > 0 && (
    <div className='flex-column' id='details-response-container'>
      <div id='response'>
        Request
      </div>
      {hasCSP && <p>CSP</p>}
      {hasFP && <p>FP</p>}
      {hasSetCookie && <p>SetCookie</p>}
      {hasCookies && <p>Cookies</p>}
      {mapOverHeaders(response.headers)}
      <div className='flex-column' id='body'>
        Body <br />
        {response.body}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsResponseContainer);
