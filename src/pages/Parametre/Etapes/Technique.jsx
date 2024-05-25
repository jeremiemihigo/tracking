import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AutoComplement from './Complement';
import { Grid, Button, Typography } from '@mui/material';
import AutoComplementent from 'components/AutoComplete';
import { Save } from '@mui/icons-material';
import { Postetape } from 'Redux/etape';
import { config, lien_read } from 'static/Lien';
import axios from 'axios';

function Technique() {
  const action = useSelector((state) => state.action?.action);
  const [actionTwo, setActionSelectTwo] = React.useState('');

  const [typeSelect, setTypeSelect] = React.useState('');
  const dispatch = useDispatch();

  const types = [
    { id: 1, title: 'Technique', value: 'technique' },
    { id: 2, title: 'Non technique', value: 'nonTechnique' }
  ];

  const send = (e) => {
    e.preventDefault();
    try {
      if (typeSelect === '' || actionTwo === '') {
        alert('Veuillez renseigner les champs');
      } else {
        let data = { label: typeSelect?.value, nexte: actionTwo?.idAction };
        dispatch(Postetape(data));
        setActionSelectTwo('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [plainte, setPlainte] = React.useState();
  const loading = async () => {
    const response = await axios.get(lien_read + '/techNonTech', config);
    setPlainte(response.data);
  };
  console.log(plainte);

  return (
    <div style={{ minWidth: '35rem', marginTop: '10px' }}>
      <Grid container>
        <Grid item lg={6}>
          <div style={{ marginBottom: '10px' }}>
            <AutoComplementent value={typeSelect} setValue={setTypeSelect} options={types} title="Title" propr="title" />
          </div>
        </Grid>
        <Grid item lg={6} sx={{ paddingLeft: '5px' }}>
          {action && <AutoComplement value={actionTwo} setValue={setActionSelectTwo} options={action} title="action" />}

          <div style={{ marginTop: '10px' }}>
            <Button variant="contained" color="primary" onClick={(e) => send(e)}>
              <Save fontSize="small" /> <span style={{ marginLeft: '10px' }}>Save</span>
            </Button>
          </div>
        </Grid>
      </Grid>
      <div>
        <Typography sx={{ color: 'blue', cursor: 'pointer', fontSize: '12px', fontWeight: 'bolder' }} onClick={(e) => loading(e)}>
          View
        </Typography>
      </div>
      <Grid container>
        {plainte &&
          plainte.map((index) => {
            return (
              <React.Fragment key={index._id}>
                <Grid item lg={12} className="gridFirst">
                  <p>Plainte : {index?.label}</p>
                  <p>action suivante : {index.action?.title}</p>
                  <p>status : {index.status?.title.toLowerCase()}</p>
                  <p>in charge : {index.role?.title}</p>
                </Grid>
              </React.Fragment>
            );
          })}
      </Grid>
    </div>
  );
}

export default Technique;
