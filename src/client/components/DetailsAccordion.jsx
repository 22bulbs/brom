import React from 'react';

const DetailsAccordion = ({ textObject, id }) => (
  <div id={id}>
    {
      Object.keys(textObject).map(el => (
        <div
          key={el}
          className="flex-row key-value-display"
        >
          <div>
            <p><strong>{el}:</strong></p>
          </div>
          <div>
            {textObject[el].map(string => <p key={string}>{string}</p>)}
          </div>
        </div>
      ))
    }
  </div>
);

export default DetailsAccordion;
