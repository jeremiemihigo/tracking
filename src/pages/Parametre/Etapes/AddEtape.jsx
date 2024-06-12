import { Save } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { Postetape } from 'Redux/etape';
import AutoComplementent from 'components/AutoComplete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoComplement from './Complement';

function AddEtape() {
  const status = useSelector((state) => state.status?.status);
  const [statusOne, setStatusSelectOne] = React.useState('');
  const [statusTwo, setStatusSelectTwo] = React.useState('');
  const [labelOne, setLabelOne] = React.useState('');
  const dispatch = useDispatch();

  const send = (e) => {
    e.preventDefault();
    try {
      if (labelOne === '' || statusTwo === '') {
        alert('Veuillez renseigner les champs');
      } else {
        let data = { label: labelOne?.idLabel, nexte: statusTwo?.idStatus };
        dispatch(Postetape(data));
        setStatusSelectOne('');
        setStatusSelectTwo('');
        setLabelOne('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ minWidth: '35rem', marginTop: '10px' }}>
      <Grid container>
        <Grid item lg={6}>
          {status && (
            <div style={{ marginBottom: '10px' }}>
              <AutoComplement value={statusOne} setValue={setStatusSelectOne} options={status} title="Status" />
            </div>
          )}
          {statusOne !== '' && (
            <AutoComplementent value={labelOne} setValue={setLabelOne} options={statusOne?.label} title="Label" propr="title" />
          )}
        </Grid>
        <Grid item lg={6} sx={{ paddingLeft: '5px' }}>
          {status && <AutoComplement value={statusTwo} setValue={setStatusSelectTwo} options={status} title="title" />}

          <div style={{ marginTop: '10px' }}>
            <Button variant="contained" color="primary" onClick={(e) => send(e)}>
              <Save fontSize="small" /> <span style={{ marginLeft: '10px' }}>Save</span>
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddEtape;
