import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import { Fab, Grid, Tooltip } from '@mui/material';
import MainCard from 'components/MainCard';
import React from 'react';
import { useSelector } from 'react-redux';
import Popup from 'static/Popup';
import AddEtape from './AddEtape';
import './etape.css';

function Index() {
  const [open, setOpen] = React.useState(false);
  const etape = useSelector((state) => state.etape?.etape);
  console.log(etape);

  return (
    <MainCard>
      <Tooltip title="Next step">
        <Fab color="primary" size="small" onClick={() => setOpen(true)}>
          <DoNotStepIcon fontSize="small" />
        </Fab>
      </Tooltip>

      <Grid container>
        {etape &&
          etape.map((index) => {
            return (
              <React.Fragment key={index._id}>
                <Grid item lg={5} className="gridFirst">
                  <p>status : {index.previusStatus[0]?.title}</p>
                </Grid>
                <Grid item lg={1} className="midlleGrid">
                  <ArrowForwardIcon />
                </Grid>
                <Grid item lg={6} className="gridSecond">
                  <p>status : {index.nextStatus?.title}</p>
                  <p>process : {index.nextprocess[0]?.title}</p>
                </Grid>
              </React.Fragment>
            );
          })}
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Configure the next step">
        <AddEtape />
      </Popup>
    </MainCard>
  );
}

export default Index;
