/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AutoComplement from 'components/AutoComplete';
import { PostProcess, PutProcess } from 'Redux/Process';

function AddProcess({ edit }) {
  const [texte, setTexte] = React.useState('');
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main?.main);
  const [mainSelect, setMainSelect] = React.useState('');

  const sendProcess = (e) => {
    e.preventDefault();
    let data = {
      title: texte,
      idMainProcess: mainSelect.idMainProcess
    };
    dispatch(PostProcess(data));
    setTexte('');
    setMainSelect('');
  };
  const EditProcess = (e) => {
    e.preventDefault();
    dispatch(PutProcess({ title: texte, _id: edit.id }));
    setTexte('');
    setMainSelect('');
  };
  React.useEffect(() => {
    if (edit) {
      setTexte(edit.texte);
    }
  }, [edit]);
  return (
    <div style={{ width: '16rem' }}>
      <div style={{ marginTop: '10px' }}>
        {main && !edit && (
          <AutoComplement value={mainSelect} setValue={setMainSelect} options={main} title="Select main process" propr="title" />
        )}
      </div>
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
export default AddProcess;
