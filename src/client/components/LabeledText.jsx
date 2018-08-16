import React from 'react';

const LabeledText = ({ label, text }) => (
  <span className="labeled-text">
    <strong>{label}:</strong> {text}
  </span>
);

export default LabeledText;
