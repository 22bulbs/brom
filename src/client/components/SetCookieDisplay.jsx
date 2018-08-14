import React from 'react';

const SetCookieDisplay = ({ policy }) => (
  <div className="set-cookie border-bottom">
    <p><strong>Set-Cookie</strong></p>
    {
      policy.map(({ name, value, ...details }) => (
        <div key={`${name}${value}`}>
          <p><strong>{name}={value}</strong></p>
          {Object.keys(details).map(el =>
            <CookieDetails key={el} name={el} value={details[el]} />)}
        </div>
      ))
    }
  </div>
);

const CookieDetails = ({ name, value }) => (
  <p key={name}><strong>{name}:</strong> {value}</p>
);

export default SetCookieDisplay;
