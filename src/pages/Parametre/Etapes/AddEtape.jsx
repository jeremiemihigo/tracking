import { Save } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { Postetape } from 'Redux/etape';
import AutoComplementent from 'components/AutoComplete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoComplement from './Complement';

function AddEtape() {
  const action = useSelector((state) => state.action?.action);
  const [actionOne, setActionSelectOne] = React.useState('');
  const [actionTwo, setActionSelectTwo] = React.useState('');
  const [labelOne, setLabelOne] = React.useState('');
  const dispatch = useDispatch();

  const send = (e) => {
    e.preventDefault();
    try {
      if (labelOne === '' || actionTwo === '') {
        alert('Veuillez renseigner les champs');
      } else {
        let data = { label: labelOne?.idLabel, nexte: actionTwo?.idAction };
        dispatch(Postetape(data));
        setActionSelectOne('');
        setActionSelectTwo('');
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
          {action && (
            <div style={{ marginBottom: '10px' }}>
              <AutoComplement value={actionOne} setValue={setActionSelectOne} options={action} title="action" />
            </div>
          )}
          {actionOne !== '' && (
            <AutoComplementent
              value={labelOne}
              setValue={setLabelOne}
              options={actionOne?.statusAction}
              title="Status label"
              propr="title"
            />
          )}
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
    </div>
  );
}

export default AddEtape;
