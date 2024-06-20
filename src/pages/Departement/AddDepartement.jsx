import { Add } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { Postdepartement } from 'Redux/Departement';
import React from 'react';
import { useDispatch } from 'react-redux';

function AddDepartement() {
  const [departement, setDepartement] = React.useState('');
  const dispatch = useDispatch();

  const sendData = (e) => {
    e.preventDefault();
    dispatch(Postdepartement({ departement }));
    setDepartement('');
  };
  return (
    <div style={{ width: '20rem' }}>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          fullWidth
          value={departement}
          variant="outlined"
          onChange={(e) => setDepartement(e.target.value)}
          placeholder="Departement"
        />
      </div>
      <div>
        <Button fullWidth color="primary" variant="contained" onClick={(e) => sendData(e)}>
          <Add fontSize="small" /> Save
        </Button>
      </div>
    </div>
  );
}

export default AddDepartement;
