/* eslint-disable react/prop-types */
import { Grid, Paper, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import Selected from 'components/Selected';
import dayjs from 'dayjs';
import moment from 'moment';
import Result from 'pages/TakeAction/Result';
import React from 'react';

function AllClient({ data }) {
  const [selected, setSelected] = React.useState('');
  const [recherche, setRecherche] = React.useState('');
  const option = [
    { id: 1, title: 'OUTSLA', value: 'outsla' },
    { id: 2, title: 'INSLA', value: 'insla' },
    { id: 3, title: 'Action', value: 'action' },
    { id: 4, title: 'Customer', value: 'customer' }
  ];
  return (
    <>
      <MainCard title="">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontSize: '15px', fontWeight: 'bolder', textTransform: 'uppercase' }}>ALL THE CLIENTS</p>
          <div style={{ width: '20%', margin: '0px 20px' }}>
            <Selected label="Recherche" data={option} value={recherche} setValue={setRecherche} />
          </div>
          <div style={{ width: '40%' }}>
            <TextField placeholder={`Recherche << ${recherche} >>`} fullWidth variant="outlined" />
          </div>
        </div>
      </MainCard>
      <Grid sx={{ marginTop: '10px' }}>
        {data &&
          data.map((index) => {
            return (
              <Paper
                key={index._id}
                sx={{ cursor: 'pointer', marginBottom: '10px', padding: '10px' }}
                onClick={() => setSelected(index._id)}
              >
                <p>
                  {index.unique_account_id}; {index.customer_name} <span>{moment(index.date_timestamp).fromNow()}</span>
                </p>
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
    </>
  );
}

export default AllClient;
