/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Paper } from '@mui/material';
import Result from 'pages/TakeAction/Result';
import dayjs from 'dayjs';
import { differenceDays } from 'static/Lien';

function ComponentClientObject({ data }) {
  const [selected, setSelected] = React.useState('');
  return (
    <div>
      <Grid sx={{ marginTop: '10px' }}>
        {data &&
          data.map((index) => {
            return (
              <Paper
                key={index._id}
                sx={{ cursor: 'pointer', marginBottom: '10px', padding: '10px' }}
                onClick={() => setSelected(index._id)}
              >
                <div>
                  <p>
                    {index.unique_account_id}; {index.customer_name}
                  </p>
                  <p style={{ display: 'flex' }}>
                    Statut : <p> {'  ' + index.result.action}</p>{' '}
                    <p
                      style={{
                        marginLeft: '10px',
                        background: `${
                          differenceDays(index.result.dateFin, index.result.dateDebut) - index.result.delaiPrevu >= 0
                            ? '#dedede'
                            : '#7B3030'
                        }`,
                        color: `${
                          differenceDays(index.result.dateFin, index.result.dateDebut) - index.result.delaiPrevu >= 0 ? '#000' : '#fff'
                        }`,
                        borderRadius: '10px',
                        fontSize: '10px',
                        fontWeight: 'bolder',
                        padding: '1px 10px'
                      }}
                    >
                      {differenceDays(index.result.dateFin, index.result.dateDebut) - index.result.delaiPrevu} jour(s)
                    </p>
                  </p>
                </div>

                {selected === index._id && (
                  <Grid container>
                    <Grid item lg={4}>
                      <p>
                        <span>customer_status :</span> {index.customer_status}
                      </p>
                      <p>
                        <span>enable_status :</span> {index.enable_status}
                      </p>
                      <p>
                        <span>date_timestamp :</span> {dayjs(index.date_timestamp).format('DD/MM/YYYY')}
                      </p>
                      <p>
                        <span>expiry_timestamp :</span> {dayjs(index.default_timestamp).format('DD/MM/YYYY')} à{' '}
                        {`${new Date(index.default_timestamp).getHours()}:${new Date(index.default_timestamp).getMinutes()}`}
                      </p>
                      <p>
                        <span>par_to_date :</span> {index.par_to_date}
                      </p>
                      <p>
                        <span>payment_status :</span> {index.payment_status}
                      </p>
                      <p>
                        <span>shop_region :</span> {index.shop_region}/{index.shop_name}
                      </p>
                    </Grid>
                    <Grid item lg={8}>
                      <Grid className="actionsChild">
                        <div className="result">
                          <Result index={index.result} />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Paper>
            );
          })}
      </Grid>
    </div>
  );
}

export default ComponentClientObject;
