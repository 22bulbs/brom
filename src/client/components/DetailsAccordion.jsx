import React from 'react';

const DetailsAccordion = ({ textObject, id }) => (
  <div id={id}>
    {
      Object.keys(textObject).map(el => (
        <div className="flex-row key-value-display">
          <div>
            <p><strong>{el}:</strong></p>
          </div>
          <div>
            {textObject[el].map(string => <p>{string}</p>)}
          </div>
        </div>
      ))
    }
  </div>
);

export default DetailsAccordion;
