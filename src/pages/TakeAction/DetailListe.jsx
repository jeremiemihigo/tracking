import React from 'react';
import { CreateContexte } from './Contexte';
import MainCard from 'components/MainCard';

import Result from './Result';

function DetailListe() {
  const { clientSelect } = React.useContext(CreateContexte);
  return (
    <MainCard>
      {clientSelect && clientSelect.result.length > 0 ? (
        clientSelect.result.map((index) => {
          return (
            <React.Fragment key={index._id}>
              <Result index={index} />
            </React.Fragment>
          );
        })
      ) : (
        <p style={{ textAlign: 'center' }}>Until now there is no action for this customer</p>
      )}
    </MainCard>
  );
}

export default DetailListe;
