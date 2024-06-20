import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Postrole, putrole } from 'Redux/Role';
import { Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import ColorPicker from '../Action/ColorPicker';

function AddRole(props) {
  const { edit } = props;

  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const [hex, setHex] = React.useState('');

  const send = (e) => {
    e.preventDefault();
    let data = { title: value, color: hex };
    dispatch(Postrole(data));
    setValue('');
  };
  const editfunc = () => {
    let data = {
      id: edit._id,
      title: value,
      color: hex
    };
    dispatch(putrole(data));
    setValue('');
  };
  React.useEffect(() => {
    if (edit) {
      setHex(edit.color || '#fff');
      setValue(edit.title);
    }
  }, [edit]);

  return (
    <div style={{ width: '20rem' }}>
      <div style={{ marginBottom: '10px' }}>
        <Input placeholder="Rôle" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <ColorPicker setHex={setHex} hex={hex} />
      </div>

      <div>
        <Button onClick={edit ? (e) => editfunc(e) : (e) => send(e)} variant="contained" color="primary" fullWidth>
          {!edit && <Add fontSize="small" />} {edit ? 'Modifier' : 'Enregistrer'}
        </Button>
      </div>
    </div>
  );
}

export default AddRole;
