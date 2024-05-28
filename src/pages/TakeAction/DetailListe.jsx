import { Grid } from '@mui/material';
import React from 'react';
import { CreateContexte } from './Contexte';
import Result from './Result';
function DetailListe() {
  const { clientSelect } = React.useContext(CreateContexte);

  return (
    <Grid className="resultTable">
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
    </Grid>
  );
}

export default DetailListe;
