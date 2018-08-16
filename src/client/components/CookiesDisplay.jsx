import React from 'react';
import Icon from './Icon';

const CookiesDisplay = ({ cookies }) => (
  <div className="cookies border-bottom">
    <p><Icon flag="cookies" /><strong>Cookies</strong></p>
    {cookies.map(el => (
      <p key={`${el.name}${el.value}`}>
        <strong>{el.name}:</strong> {el.value}
      </p>))}
  </div>
);

export default CookiesDisplay;
