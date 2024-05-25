// material-ui
import { Grid } from '@mui/material';

// project import
// import MainCard from 'components/MainCard';
import Liste from './Liste';
import Contexte from './Contexte';
import Detail from './Detail';
import './action.css';
import DetailListe from './DetailListe';
import { useLocation } from 'react-router-dom';
// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const ComponentTypography = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <Contexte>
      <Grid container spacing={3} sx={{paddingLeft:"10px"}}>
        <Grid item xs={12} lg={3} >
          <Liste client={state} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Detail />
        </Grid>
        <Grid item xs={12} lg={5}>
          <DetailListe />
        </Grid>
      </Grid>
    </Contexte>
  );
};

export default ComponentTypography;
