import React from 'react';
import DetailsAccordion from './DetailsAccordion';
import Icon from './Icon';

const CSPDisplay = ({ policy }) => (
  <div className="csp border-bottom">
    <p><Icon flag="csp" /><strong>Content-Security-Policy</strong></p>
    <DetailsAccordion textObject={policy} />
  </div>
);

export default CSPDisplay;
