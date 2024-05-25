import MainCard from 'components/MainCard';
import React from 'react';
import AddEtape from './AddEtape';
import Popup from 'static/Popup';
import { Typography } from '@mui/material';
import './etape.css';
import { useSelector } from 'react-redux';
import { Grid } from '../../../../node_modules/@mui/material/index';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Index() {
  const [open, setOpen] = React.useState(false);
  const etape = useSelector((state) => state.etape?.etape);

  return (
    <MainCard title="Processus">
      <Typography component="p" onClick={() => setOpen(true)}>
        Processus
      </Typography>
      <Grid container>
        {etape &&
          etape.map((index) => {
            return (
              <React.Fragment key={index._id}>
                <Grid item lg={5} className="gridFirst">
                  <p>status : {index.previousStatus?.title}</p>
                  <p>action : {index.actionprevious?.title}</p>
                  <p>statut : {index.label?.title.toLowerCase()}</p>
                  <p>in charge : {index.previousRole[0]?.title}</p>
                </Grid>
                <Grid item lg={1} className="midlleGrid">
                  <ArrowForwardIcon />
                </Grid>
                <Grid item lg={6} className="gridSecond">
                  <p>status : {index.previousStatus?.title}</p>
                  <p>action : {index.nextAction?.title}</p>
                  <p>in charge : {index.nextRole[0]?.title}</p>
                </Grid>
              </React.Fragment>
            );
          })}
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Parametrer l'etape suivante">
        <AddEtape />
      </Popup>
    </MainCard>
  );
}

export default Index;
