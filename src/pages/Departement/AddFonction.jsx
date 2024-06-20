import { Add } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { PostFonction } from 'Redux/Departement';
import React from 'react';
import { useDispatch } from 'react-redux';

function AddFonction({ dept }) {
  const dispatch = useDispatch();
  const [fonction, setFonction] = React.useState('');

  const sendData = (e) => {
    e.preventDefault();
    const data = {
      idDepartement: dept,
      fonction
    };
    dispatch(PostFonction(data));
    setFonction('');
  };
  return (
    <div style={{ width: '20rem' }}>
      <div style={{ marginBottom: '10px' }}>
        <TextField value={fonction} fullWidth variant="outlined" onChange={(e) => setFonction(e.target.value)} placeholder="Fonction" />
      </div>

      <div>
        <Button fullWidth color="primary" variant="contained" onClick={(e) => sendData(e)}>
          <Add fontSize="small" /> Save
        </Button>
      </div>
    </div>
  );
}

export default AddFonction;
