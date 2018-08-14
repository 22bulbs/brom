import React from 'react';

const CookiesDisplay = ({ cookies }) => (
  <div className="cookies border-bottom">
    <p><strong>Cookies</strong></p>
    {cookies.map(el => (
      <p><strong>{el.name}:</strong> {el.value}</p>))}
  </div>
);

export default CookiesDisplay;
