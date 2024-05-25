import React from 'react';
import { Input } from 'antd';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { Postdepartement } from 'Redux/Departement';

function AddDepartement() {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  const send = (e) => {
    e.preventDefault();
    let data = { title: value };
    dispatch(Postdepartement(data));
  };

  return (
    <div style={{ width: '20rem' }}>
      <div>
        <Input placeholder="Département" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button onClick={(e) => send(e)} variant="contained" color="primary" fullWidth>
          <Add fontSize="small" /> Ajouter
        </Button>
      </div>
    </div>
  );
}

export default AddDepartement;
