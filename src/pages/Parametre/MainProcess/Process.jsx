import { Button } from '@mui/material';
import { PostProcess } from 'Redux/Process';
import { Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

function Process() {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const sendData = (e) => {
    e.preventDefault();
    dispatch(PostProcess({ title: value }));
    setValue('');
  };
  return (
    <div style={{ width: '20rem' }}>
      <div style={{ marginBottom: '10px' }}>
        <Input placeholder="Title" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div>
        <Button color="primary" variant="contained" onClick={(e) => sendData(e)}>
          Valider
        </Button>
      </div>
    </div>
  );
}

export default Process;
