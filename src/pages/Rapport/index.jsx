import { Search } from '@mui/icons-material';
import { Fab, Grid } from '@mui/material';
import React from 'react';
import Popup from 'static/Popup';
import Action from './Action';
import Agent from './Agent';
import Contexte from './Contexte';
import Form from './Form';
import Sla from './Sla';
import './style.css';

function Index() {
  const [open, setOpen] = React.useState(false);
  const [dateSelect, setDateSelect] = React.useState({
    debut: '',
    fin: ''
  });
  return (
    <Contexte>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: '10px' }}>
          <Fab size="small" color="primary" onClick={() => setOpen(true)}>
            <Search fontSize="small" />
          </Fab>
        </div>
      </div>
      <Grid container>
        <Grid item lg={4}>
          <Agent />
        </Grid>
        <Grid item lg={3} sx={{ padding: '0px 3px' }}>
          <Sla />
        </Grid>
        <Grid item lg={5}>
          <Action />
        </Grid>
      </Grid>

      <Popup open={open} setOpen={setOpen} title="Recherche">
        <Form setDateSelect={setDateSelect} dateSelect={dateSelect} />
      </Popup>
    </Contexte>
  );
}
export default Index;
