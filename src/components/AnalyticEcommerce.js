/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from './MainCard';

// assets

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ title, count, bg, functionAction, functionListe }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textSecondary" noWrap>
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item lg={4} sm={4} xs={4} md={4}>
          <Typography component="p">{count}</Typography>
        </Grid>
        <Grid item lg={4} sm={4} xs={4} md={4}>
          <Typography component="span" sx={{ marginRight: '30px', fontWeight: 'bolder', fontSize: '12px' }} onClick={() => functionListe()}>
            Liste
          </Typography>
        </Grid>
        <Grid item lg={4} sm={4} xs={4} md={4}>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bolder' }} component="span" onClick={() => functionAction()}>
            Take action
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item lg={4} xs={4} sx={{ padding: '4px' }}>
          <div style={{ background: '#00a9e0', padding: '5px', borderRadius: '10px' }}>
            <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '11px', margin: '0px', padding: '0px' }} color="inherit">
              INSLA
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bolder' }} color="inherit">
              {bg.nombreIn}
            </Typography>
          </div>
        </Grid>
        <Grid item lg={4} xs={4} sx={{ padding: '4px' }}>
          <div style={{ background: '#E5EFF6', padding: '5px', borderRadius: '10px' }}>
            <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '11px' }} color="inherit">
              OUTSLA
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bolder' }} color="inherit">
              {bg.nombreOut}
            </Typography>
          </div>
        </Grid>
        <Grid item lg={4} xs={4} sx={{ padding: '5px' }}>
          <div style={{ background: '#FEF6AA', padding: '5px', borderRadius: '10px' }}>
            <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '11px' }} color="inherit">
              Today
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bolder' }} color="inherit">
              {bg.today}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Stack>
  </MainCard>
);
AnalyticEcommerce.propTypes = {
  title: PropTypes.string,
  bg: PropTypes.object,
  functionAction: PropTypes.func,
  functionListe: PropTypes.func
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;
