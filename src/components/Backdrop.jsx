/* eslint-disable react/prop-types */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Paper } from '@mui/material';

function SimpleBackdrop({ open, title }) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }} open={open}>
      <Paper sx={{ width: '7rem', display: 'flex', padding: '10px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress size={15} color="primary" />
          <p>{title || "Laading..."}</p>
        </div>
      </Paper>
    </Backdrop>
  );
}
export default SimpleBackdrop;
