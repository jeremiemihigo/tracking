/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
// material-ui
import { Grid, Paper, Typography } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
// project import

// assets

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ title, data, count, bg }) => {
  const status = useSelector((state) => state.status?.status);
  const [statutSelect, setStatusSelect] = React.useState();
  React.useEffect(() => {
    setStatusSelect(_.filter(status, { idStatus: data }));
  }, [data]);
  return (
    <Paper sx={{ padding: '4px' }}>
      <div style={{ minWidth: '5rem' }}>
        <Grid container>
          <Grid item lg={10} xs={10} sm={10} md={10}>
            <Typography component="p" sx={{ fontSize: '12px', fontWeight: 'bolder' }} noWrap>
              {title}
            </Typography>
          </Grid>
          <Grid item lg={2} xs={2} sm={2} md={2} sx={{ background: '#002d72', borderRadius: '20px', textAlign: 'center', color: 'white' }}>
            <Typography component="p">{count}</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item lg={4} xs={4} sx={{ padding: '4px' }}>
            <div style={{ background: '#068E14', color: '#fff', padding: '5px', borderRadius: '10px' }}>
              <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '6px', margin: '0px', padding: '0px' }} color="inherit">
                IN SLA
              </Typography>
              <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bolder' }} color="inherit">
                {bg.nombreIn}
              </Typography>
            </div>
          </Grid>
          <Grid item lg={4} xs={4} sx={{ padding: '4px' }}>
            <div style={{ background: '#EE1912', color: '#fff', padding: '5px', borderRadius: '10px' }}>
              <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '6px' }} color="inherit">
                OUT SLA
              </Typography>
              <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bolder' }} color="inherit">
                {bg.nombreOut}
              </Typography>
            </div>
          </Grid>
          <Grid item lg={4} xs={4} sx={{ padding: '5px' }}>
            <div style={{ background: '#FEF6AA', padding: '5px', borderRadius: '10px' }}>
              <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '6px' }} color="inherit">
                Today
              </Typography>
              <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bolder' }} color="inherit">
                {bg.today}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          {statutSelect && statutSelect[0]?.instruction && (
            <>
              <div
                style={{
                  backgroundColor: '#002d72',
                  margin: '5px 0px',
                  borderRadius: '3px',
                  width: '100%',
                  color: '#fff',
                  padding: '0px'
                }}
              >
                <p style={{ textAlign: 'center', fontSize: '12px', margin: '0px', padding: '0px', fontWeight: 'bolder' }}>Instruction</p>
              </div>
              {statutSelect && <p style={{ fontSize: '12px', margin: '0px 10px', textAlign: 'justify' }}>{statutSelect[0]?.instruction}</p>}
            </>
          )}
          {statutSelect && statutSelect[0].actions.length > 0 && (
            <>
              <div
                style={{ backgroundColor: '#002d72', margin: '5px 0px', borderRadius: '3px', width: '100%', color: '#fff', padding: '0px' }}
              >
                <p style={{ textAlign: 'center', fontSize: '12px', margin: '0px', padding: '0px', fontWeight: 'bolder' }}>Actions</p>
              </div>
              <div style={{ marginLeft: '10px' }}>
                <ol>
                  {statutSelect[0].actions?.map((index, key) => {
                    return (
                      <li style={{ fontSize: '12px' }} key={key}>
                        {index.title}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </>
          )}
        </Grid>
      </div>
    </Paper>
  );
};
AnalyticEcommerce.propTypes = {
  title: PropTypes.string,
  bg: PropTypes.object
};

export default AnalyticEcommerce;
