import MainCard from 'components/MainCard';
import React from 'react';
import { CreateContexte } from './Contexte';
import { config, lien_post } from 'static/Lien';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { Grid } from '../../../node_modules/@mui/material/index';

function DeedLine() {
  const { optionSelect } = React.useContext(CreateContexte);
  const [initiale, setInitiale] = React.useState({ debut: '', fin: '' });
  const { debut, fin } = initiale;
  const [data, setData] = React.useState();
  const loading = async () => {
    try {
      const response = await axios.post(lien_post + '/deedline', { debut, fin }, config);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <MainCard title="">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontSize: '15px', fontWeight: 'bolder', textTransform: 'uppercase', marginRight: '10px' }}>{optionSelect.title}</p>
          <TextField type="date" width="20%" onChange={(e) => setInitiale({ ...initiale, debut: e.target.value })} />
          <TextField type="date" width="20%" onChange={(e) => setInitiale({ ...initiale, fin: e.target.value })} />
          <Button onClick={() => loading()}>Valider</Button>
        </div>
      </MainCard>
      <Grid container sx={{ marginTop: '10px' }}>
        {data &&
          data.length > 0 &&
          data.map((index, key) => {
            return (
              <Grid key={key} item lg={6} sx={{ padding: '5px' }}>
                <MainCard title={index.role} key={key}>
                  <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid
                      sx={{
                        background: 'blue',
                        width: '20%',
                        fontSize: '20px',
                        borderRadius: '20px',
                        padding: '20px',
                        marginRight: '10px',
                        textAlign: 'center'
                      }}
                    >
                      {index.result.insla}
                    </Grid>
                    <Grid
                      sx={{
                        background: 'red',
                        width: '20%',
                        fontSize: '20px',
                        borderRadius: '20px',
                        padding: '20px',
                        textAlign: 'center'
                      }}
                    >
                      {index.result.outsla}
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default DeedLine;
