import MainCard from 'components/MainCard';
import React from 'react';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

function Index() {
  return (
    <div>
      <MainCard title="Visted or Called">
        <Fab size="small" color="primary">
          <Add fontSize="small" />
        </Fab>
      </MainCard>
    </div>
  );
}
export default Index;
