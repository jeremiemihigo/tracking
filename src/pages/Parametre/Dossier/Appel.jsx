import { Grid } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { CreateContexte } from './Context';

function Appel() {
  const { readUploadFile, allAdresse, setAppelSortant } = React.useContext(CreateContexte);

  const [appel, setAppel] = React.useState();
  const formatedNumero = (numero) => {
    if (numero.length > 0) {
      if (numero.length === 12) {
        return numero;
      }
      if (numero.length === 13) {
        return Array.from(numero).slice(1).join('');
      }
      if (numero.length === 9) {
        return '243' + numero;
      }
      if (numero.length === 10) {
        return '243' + Array.from(numero).slice(1).join('');
      }
    }
  };
  function searchCode(numero) {
    if (_.filter(allAdresse, { customer_phone_1: formatedNumero(numero) }).length > 0) {
      return _.filter(allAdresse, { customer_phone_1: formatedNumero(numero) })[0]['unique_account_id'];
    }
    if (_.filter(allAdresse, { customer_phone_2: formatedNumero(numero) }).length > 0) {
      return _.filter(allAdresse, { customer_phone_1: formatedNumero(numero) })[0]['unique_account_id'];
    }
  }
  const functionAppelSortant = () => {
    if (allAdresse && appel && appel.length > 0) {
      let table = [];
      for (let i = 0; i < appel.length; i++) {
        if (appel[i].Type === 'outbound') {
          table.push({
            UniqueID: appel[i]['UniqueID'],
            unique_account_id: searchCode(appel[i]['Destination']),
            Source: appel[i]['Source'],
            Destination: appel[i]['Destination'],
            feedback: appel[i]['Feedback'],
            StartTime: appel[i]['StartTime'],
            EndTime: appel[i]['EndTime'],
            Duration: appel[i]['Duration'],
            Disposition: appel[i]['Disposition'],
            appel: true
          });
        }
      }
      setAppelSortant(table);
    }
  };

  React.useEffect(() => {
    functionAppelSortant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAdresse, appel]);

  return (
    <div>
      <Grid item lg={3} xs={12} sm={6} md={6} sx={{ paddingLeft: '10px' }}>
        <input type="file" id="actual-btn" accept=".xlsx" hidden onChange={(e) => readUploadFile(e, setAppel)} />
        <label className="label" htmlFor="actual-btn">
          Clic here to choose file (call)
        </label>
      </Grid>
    </div>
  );
}

export default Appel;
