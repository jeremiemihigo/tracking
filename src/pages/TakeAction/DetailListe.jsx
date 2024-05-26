import React from 'react';
import { CreateContexte } from './Contexte';

import Result from './Result';

function DetailListe() {
  const { clientSelect } = React.useContext(CreateContexte);
  return (
    <div style={{ height: '10rem' }}>
      {clientSelect && clientSelect.result.length > 0 ? (
        clientSelect.result.reverse().map((index) => {
          return (
            <React.Fragment key={index._id}>
              <Result index={index} />
            </React.Fragment>
          );
        })
      ) : (
        <p style={{ textAlign: 'center' }}>Until now there is no action for this customer</p>
      )}
    </div>
  );
}

export default DetailListe;
