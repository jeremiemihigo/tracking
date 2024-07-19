import { Grid } from '@mui/material';
import React from 'react';
import { CreateContexte } from './Context';

function ClientToTrack() {
  const { readUploadFile, setAllAdresse } = React.useContext(CreateContexte);

  return (
    <Grid item lg={3} xs={12} sm={6} md={6} sx={{ paddingLeft: '10px' }}>
      <input type="file" id="actual-btn" accept=".xlsx" hidden onChange={(e) => readUploadFile(e, setAllAdresse)} />
      <label className="label" htmlFor="actual-btn">
        Clic here to choose file (all adress)
      </label>
    </Grid>
  );
}

export default ClientToTrack;
