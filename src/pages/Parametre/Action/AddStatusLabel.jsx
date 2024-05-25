/* eslint-disable react/prop-types */
import React from 'react';
// import TextArea from 'components/TextArea';

import { TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { PoststatusLabel } from 'Redux/action';

function AddStatusLabel({ action }) {
  const { idAction } = action;
  const [title, setTitle] = React.useState('');

  const dispatch = useDispatch();
  const sendData = (e) => {
    e.preventDefault();
    const data = {
      title,
      idAction
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
