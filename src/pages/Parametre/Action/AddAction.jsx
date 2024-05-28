/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { Postaction, Putaction } from 'Redux/action';
import { Input } from 'antd';
import AutoComplement from 'components/AutoComplete';
import TextArea from 'components/TextArea';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorPicker from './ColorPicker';

function AddAction({ edit, status }) {
  const [texte, setTexte] = React.useState('');
  const [delai, setDelai] = React.useState(1);
  const [hex, setHex] = React.useState('#fff');
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
      color: hex,
      objectif
    };
    //idStatus, title, idRole, delai
    dispatch(Postaction(data));
    setTexte('');
    setHex('#fff');
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
    <div style={{ width: '30rem' }}>
      <div style={{ marginTop: '10px' }}>
        {role && !edit && <AutoComplement value={valueSelect} setValue={setValueSelect} options={role} title="Select Role" propr="title" />}
      </div>
      <div style={{ margin: '10px 0px' }}>
        <Input onChange={(e) => setTexte(e.target.value)} value={texte} placeholder="Ajoutez un main principal" />
      </div>
      <div style={{ margin: '10px 0px' }}>
        <Input onChange={(e) => setDelai(e.target.value)} type="number" value={delai} placeholder="Délai" />
      </div>
      <div style={{ margin: '10px 0px', display: 'flex' }}>
        <ColorPicker setHex={setHex} hex={hex} />
        <div style={{ marginLeft: '10px' }}>
          <TextArea setValue={setObjectif} value={objectif} placeholder="Objectif" />
        </div>
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
