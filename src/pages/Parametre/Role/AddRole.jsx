import React from 'react';
import { Input } from 'antd';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { Postrole } from 'Redux/Role';

function AddRole() {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  const send = (e) => {
    e.preventDefault();
    let data = { title: value };
    dispatch(Postrole(data));
    setValue('');
  };

  return (
    <div style={{ width: '20rem' }}>
      <div style={{marginBottom:"10px"}}>
        <Input placeholder="Rôle" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      
      <div>
        <Button onClick={(e) => send(e)} variant="contained" color="primary" fullWidth>
          <Add fontSize="small" /> Ajouter
        </Button>
      </div>
    </div>
  );
}

export default AddRole;
