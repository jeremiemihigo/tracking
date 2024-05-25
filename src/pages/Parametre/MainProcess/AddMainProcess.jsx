/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { PostMain, putMain } from 'Redux/mainProcess';

function AddMainProcess({ edit }) {
  const [texte, setTexte] = React.useState('');
  const dispatch = useDispatch();

  const sendMain = (e) => {
    e.preventDefault();
    dispatch(PostMain({ title: texte }));
    setTexte('');
  };
  const putMainEdit = (e) => {
    e.preventDefault();
    dispatch(putMain({ title: texte, _id: edit.id }));
    setTexte('');
  };
  React.useEffect(() => {
    if (edit) {
      setTexte(edit.texte);
    }
  }, [edit]);
  return (
    <div style={{ width: '16rem' }}>
      <div>
        <Input onChange={(e) => setTexte(e.target.value)} value={texte} placeholder="Add main process" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button onClick={!edit ? (e) => sendMain(e) : (e) => putMainEdit(e)} color="primary" variant="contained">
          Valider
        </Button>
      </div>
    </div>
  );
}
export default AddMainProcess;
