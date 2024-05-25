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
        <Grid item lg={12}>
          {count ? (
            <Typography
              variant="h4"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography component="p">{count}</Typography>
              <Typography sx={{ fontSize: '11px' }} component="p">
                <Typography component="span" sx={{marginRight:"30px"}} onClick={()=>functionListe()}>Liste</Typography>
                <Typography component="span" onClick={()=>functionAction()}>Take action</Typography>
              </Typography>
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center' }} color="inherit">
              Loading
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item lg={4} sx={{ background: '#00a9e0', padding: '5px', borderRadius: '10px' }}>
          <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '11px', margin: '0px', padding: '0px' }} color="inherit">
            INSLA
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bolder' }} color="inherit">
            {bg.nombreIn}
          </Typography>
        </Grid>
        <Grid item lg={4} sx={{ background: '#E5EFF6', padding: '5px', borderRadius: '10px' }}>
          <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '11px' }} color="inherit">
            OUTSLA
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bolder' }} color="inherit">
            {bg.nombreOut}
          </Typography>
        </Grid>
        <Grid item lg={4} sx={{ background: '#FEF6AA', padding: '5px', borderRadius: '10px' }}>
          <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '11px' }} color="inherit">
            Today
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bolder' }} color="inherit">
            {bg.today}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  </MainCard>
);
AnalyticEcommerce.propTypes = {
  title: PropTypes.string,
  bg: PropTypes.object,
  functionAction : PropTypes.func,
  functionListe : PropTypes.func
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;
