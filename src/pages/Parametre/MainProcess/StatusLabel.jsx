/* eslint-disable react/prop-types */
import React from 'react';
// import TextArea from 'components/TextArea';

import { Add } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { PoststatusLabel } from 'Redux/action';
import { useDispatch } from 'react-redux';

function AddStatusLabel({ status }) {
  const { idStatus } = status;
  const [title, setTitle] = React.useState('');

  const dispatch = useDispatch();
  const sendData = (e) => {
    e.preventDefault();
    const data = {
      title,
      idStatus
    };
    dispatch(PoststatusLabel(data));
    setTitle('');

    //title, idAction, typeData, dataSelect
  };

  return (
    <div style={{ width: '20rem', marginTop: '10px' }}>
      <div style={{ marginBottom: '15px' }}>
        <TextField
          id="outlined-basic"
          label="Status label"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="outlined"
        />
      </div>

      <Button color="primary" variant="contained" onClick={(e) => sendData(e)}>
        <Add fontSize="small" /> Enregistrer
      </Button>
    </div>
  );
}

export default AddStatusLabel;
