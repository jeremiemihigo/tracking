/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Poststatus, Putstatus } from 'Redux/status';

function AddStatus({ edit, idProcess }) {
  const [texte, setTexte] = React.useState('');
  const dispatch = useDispatch();

  const sendProcess = (e) => {
    e.preventDefault();
    let data = {
      title: texte,
      idProcess
    };
    dispatch(Poststatus(data));
    setTexte('');
  };
  const EditProcess = (e) => {
    e.preventDefault();
    dispatch(Putstatus({ title: texte, _id: edit.id }));
    setTexte('');
  };
  React.useEffect(() => {
    if (edit) {
      setTexte(edit.texte);
    }
  }, [edit]);
  return (
    <div style={{ width: '16rem' }}>
      <div style={{ marginTop: '10px' }}></div>
      <div style={{ margin: '10px 0px' }}>
        <Input onChange={(e) => setTexte(e.target.value)} value={texte} placeholder="Ajoutez un main principal" />
      </div>
      <div>
        <Button onClick={!edit ? (e) => sendProcess(e) : (e) => EditProcess(e)} color="primary" variant="contained">
          Valider
        </Button>
      </div>
    </div>
  );
}
export default AddStatus;
