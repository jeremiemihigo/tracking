import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AutoComplement from './Complement';
import { Grid, Button } from '@mui/material';
import AutoComplementent from 'components/AutoComplete';
import { Save } from '@mui/icons-material';
import { Postetape } from 'Redux/etape';
import Technique from './Technique';

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
      <div>
        <p
          style={{
            background: 'black',
            marginTop: '10px',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bolder',
            padding: '5px',
            borderRadius: '10px'
          }}
        >
          Feedback
        </p>
        <Technique />
      </div>
    </div>
  );
}

export default AddEtape;
