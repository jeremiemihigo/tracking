import { Grid, Typography } from '@mui/material';
import React from 'react';
import { sla } from 'static/Lien';
import { CreateContexte } from './Contexte';

function Sla() {
  const { data } = React.useContext(CreateContexte);
  const [analyse, setAnalyse] = React.useState({ delai: 0, hors: 0 });

  const analyseSla = () => {
    if (data && data.length > 0) {
      let delai = 0;
      let hors = 0;
      for (let i = 0; i < data.length; i++) {
        if (sla(data[i]) === 'INSLA') {
          delai = delai + 1;
        } else {
          hors = hors + 1;
        }
      }
      setAnalyse({ delai, hors });
    }
  };
  React.useEffect(() => {
    analyseSla();
  }, [data]);

  const pourcentage = (chiffre) => {
    if (chiffre && data && data.length > 0) {
      return ((chiffre * 100) / data.length).toFixed(0) + '%';
    }
  };
  return (
    <Grid container className="container">
      <Grid item lg={6} xs={6} sm={12} md={6} sx={{ borderRadius: { sm: '10px' }, marginBottom: { sm: '7px' } }} className="grid gridinsla">
        <div>
          <Typography className="title">INSLA</Typography>
          <Typography className="nombre">{analyse.delai}</Typography>
          <Typography className="pourcentage">{pourcentage(analyse.delai)}</Typography>
        </div>
      </Grid>
      <Grid item lg={6} xs={6} sm={12} md={6} sx={{ borderRadius: { sm: '10px' } }} className="grid gridoutsla">
        <div>
          <Typography className="title">OUTSLA</Typography>
          <Typography className="nombre">{analyse.hors}</Typography>
          <Typography className="pourcentage">{pourcentage(analyse.hors)}</Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default Sla;
