import { Grid, Typography } from '@mui/material';
import { Input } from 'antd';
import React from 'react';
import { CreateContexte } from './Context';

function ClientToTrack() {
  const { readUploadFile, setAllAdresse } = React.useContext(CreateContexte);

  return (
    <div>
      <Grid item lg={3} xs={12} sm={6} md={6} sx={{ paddingLeft: '10px' }}>
        <Typography component="p" noWrap>
          All Adresse
        </Typography>
        <Input type="file" accept=".xlsx" name="upload" id="upload" onChange={(e) => readUploadFile(e, setAllAdresse)} />
      </Grid>
    </div>
  );
}

export default ClientToTrack;
