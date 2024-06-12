/* eslint-disable react/prop-types */
import { Grid, Paper } from '@mui/material';
import dayjs from 'dayjs';
import Result from 'pages/TakeAction/Result';
import React from 'react';
import { differenceDays } from 'static/Lien';

function Component_Client({ data }) {
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
                    Statut : <p> {'  ' + index.status.title}</p>{' '}
                    <p
                      style={{
                        marginLeft: '10px',
                        background: `${index.status.sla - differenceDays(new Date().getTime(), index.updatedAt) >= 0 ? '#dedede' : '#7B3030'}`,
                        color: `${ index.status.sla - differenceDays(new Date().getTime(), index.updatedAt) >= 0 ? '#000' : '#fff'}`,
                        borderRadius: '10px',
                        fontSize: '10px',
                        fontWeight: 'bolder',
                        padding: '1px 10px'
                      }}
                    >
                      {index.status.sla - differenceDays(new Date().getTime(), index.updatedAt)} jour(s)
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

                    {index.result.length > 0 && (
                      <Grid item lg={8}>
                        {index.result.map((item, key) => {
                          return (
                            <Grid key={item._id} className="actionsChild">
                              <div className="result">
                                <Result index={item} />
                              </div>
                            </Grid>
                          );
                        })}
                        <p></p>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Paper>
            );
          })}
      </Grid>
    </div>
  );
}

export default Component_Client;
