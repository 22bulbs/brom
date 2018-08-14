import React from 'react';

const SimpleAccordion = ({ title, value }) => (
  <div
    className="simple-accordion border-bottom"
  >
    <p><strong>{title}</strong></p>
    <p>{value}</p>
  </div>
);

export default SimpleAccordion;
