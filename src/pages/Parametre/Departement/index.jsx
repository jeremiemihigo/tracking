import MainCard from 'components/MainCard';
import React from 'react';
import { Add } from '@mui/icons-material';
import Popup from 'static/Popup';
import AddDepartement from './AddDepartement';
import { Fab, Grid } from '@mui/material';
import Table from './Table';
import ContexteDepartement from './Context';
import Role from 'pages/Parametre/Role';

function Index() {
  const [open, setOpen] = React.useState(false);
  return (
    <ContexteDepartement>
      <Grid container>
        <Grid item lg={6}>
          <MainCard title="Département" sx={{ position: 'relative' }}>
            <div style={{ position: 'absolute', right: '50px', top: '10px' }}>
              <Fab size="small" color="primary" onClick={() => setOpen(true)}>
                <Add fontSize="small" />
              </Fab>
            </div>
            <Table />
          </MainCard>
        </Grid>
        <Grid item lg={6}>
          <Role />
        </Grid>
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Ajoutez un département">
        <AddDepartement />
      </Popup>
    </ContexteDepartement>
  );
}

export default Index;
