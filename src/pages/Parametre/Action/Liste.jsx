/* eslint-disable react/prop-types */
import React from 'react';

function Liste({ liste }) {
  return (
    <div>
      <ol>
        {liste.map((index) => {
          return <li key={index}>{index}</li>;
        })}
      </ol>
    </div>
  );
}

export default Liste;
