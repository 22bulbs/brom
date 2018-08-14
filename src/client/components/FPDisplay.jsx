import React from 'react';
import DetailsAccordion from './DetailsAccordion';
import Icon from './Icon';


const FPDisplay = ({ policy }) => (
  <div className="fp border-bottom">
    <p><Icon flag="fp" /><strong>Feature-Policy</strong></p>
    <DetailsAccordion textObject={policy} />
  </div>
);

export default FPDisplay;
