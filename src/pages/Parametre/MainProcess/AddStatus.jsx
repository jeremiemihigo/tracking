/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { Poststatus } from 'Redux/status';
import { Input } from 'antd';
import AutoComplement from 'components/AutoComplete';
import TextArea from 'components/TextArea';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorPicker from './ColorPicker';

function AddStatus() {
  const [texte, setTexte] = React.useState('');
  const [delai, setDelai] = React.useState(1);
  const [hex, setHex] = React.useState('#fff');
  const dispatch = useDispatch();

  const role = useSelector((state) => state.role?.role);
  const process = useSelector((state) => state.process?.process);
  const [processSelect, setProcessSelect] = React.useState('');

  const [valueSelect, setValueSelect] = React.useState('');
  const [objectif, setObjectif] = React.useState('');

  const sendAction = (e) => {
    e.preventDefault();
    let data = {
      title: texte,
      idProcess: processSelect.idProcess,
      role: valueSelect?.id,
      sla: delai,
      color: hex,
      instruction: objectif
    };
    console.log(data);
    //idStatus, title, idRole, delai
    dispatch(Poststatus(data));
    setTexte('');
    setHex('#fff');
    setValueSelect('');
    setDelai('');
    setObjectif('');
    setProcessSelect('');
  };

  return (
    <div style={{ width: '30rem' }}>
      <div style={{ marginTop: '10px' }}>
        {role && <AutoComplement value={valueSelect} setValue={setValueSelect} options={role} title="Select Role" propr="title" />}
      </div>
      <div style={{ marginTop: '10px' }}>
        {process && (
          <AutoComplement value={processSelect} setValue={setProcessSelect} options={process} title="Select Process" propr="title" />
        )}
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
        <Button onClick={(e) => sendAction(e)} color="primary" variant="contained">
          Valider
        </Button>
      </div>
    </div>
  );
}
export default AddStatus;
