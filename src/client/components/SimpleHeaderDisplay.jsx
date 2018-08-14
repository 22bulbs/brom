import React from 'react';

const upCase = string => string.replace(
  /^\w|-\w/g,
  match => match.toUpperCase(),
);

const SimpleHeaderDisplay = ({ header, value }) => (
  <div className="flex-row">
    <p><strong>{upCase(header)}: </strong></p>
    <p>{value}</p>
  </div>
);

export default SimpleHeaderDisplay;
