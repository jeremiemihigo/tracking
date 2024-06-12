/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
// material-ui
import { Grid, Paper, Typography } from '@mui/material';
import DropDown from "pages/dashboard/DropDown"
import { useSelector } from "react-redux"
import React from "react"
import _ from "lodash"
// project import

// assets

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ title, data, count, bg }) =>{
  const status = useSelector(state=>state.status?.status)
  const [statutSelect, setStatusSelect] = React.useState()
  React.useEffect(()=>{
    setStatusSelect(_.filter(status, {idStatus : data}))
  },[data])
  return(
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
        {
          statutSelect && <DropDown title="Instruction" data={statutSelect}/>
        }
       
      </Grid>
    </div>
    
  </Paper>
  )
}
AnalyticEcommerce.propTypes = {
  title: PropTypes.string,
  bg: PropTypes.object
};

export default AnalyticEcommerce;
