/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AutoComplement from 'components/AutoComplete';
import { Postaction, Putaction } from 'Redux/action';
import TextArea from 'components/TextArea';

function AddAction({ edit, status }) {
  console.log(status);
  const [texte, setTexte] = React.useState('');
  const [delai, setDelai] = React.useState(1);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role?.role);

  const [valueSelect, setValueSelect] = React.useState('');
  const [objectif, setObjectif] = React.useState('');

  const sendAction = (e) => {
    e.preventDefault();
    let data = {
      title: texte,
      idStatus: status,
      idRole: valueSelect?.id,
      delai,
      objectif
    };
    //idStatus, title, idRole, delai
    dispatch(Postaction(data));
    setTexte('');
    setValueSelect('');
    setDelai('');
    setObjectif('');
  };
  const EditAction = (e) => {
    e.preventDefault();
    dispatch(Putaction({ title: texte, _id: edit._id }));
    setTexte('');
    setValueSelect('');
    setDelai('');
  };
  React.useEffect(() => {
    if (edit) {
      setTexte(edit.title);
      setDelai(edit.delai);
    }
  }, [edit]);
  return (
    <div style={{ width: '20rem' }}>
      <div style={{ marginTop: '10px' }}>
        {role && !edit && <AutoComplement value={valueSelect} setValue={setValueSelect} options={role} title="Select Role" propr="title" />}
      </div>
      <div style={{ margin: '10px 0px' }}>
        <Input onChange={(e) => setTexte(e.target.value)} value={texte} placeholder="Ajoutez un main principal" />
      </div>
      <div style={{ margin: '10px 0px' }}>
        <Input onChange={(e) => setDelai(e.target.value)} type="number" value={delai} placeholder="Délai" />
      </div>
      <div style={{ margin: '10px 0px' }}>
        <TextArea setValue={setObjectif} value={objectif} placeholder="Objectif" />
      </div>
      <div>
        <Button onClick={!edit ? (e) => sendAction(e) : (e) => EditAction(e)} color="primary" variant="contained">
          Valider
        </Button>
      </div>
    </div>
  );
}
export default AddAction;
