import React from 'react';
import DetailsAccordion from './DetailsAccordion';

const FPDisplay = ({ policy }) => (
  <div className="fp border-bottom">
    <p><strong>Feature-Policy</strong></p>
    <DetailsAccordion textObject={policy} />
  </div>
);

export default FPDisplay;
