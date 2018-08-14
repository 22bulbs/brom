import React from 'react';
import DetailsAccordion from './DetailsAccordion';

const CSPDisplay = ({ policy }) => (
  <div className="csp border-bottom">
    <p><strong>Content-Security-Policy</strong></p>
    <DetailsAccordion textObject={policy} />
  </div>
);

export default CSPDisplay;
