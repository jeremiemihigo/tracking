import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Postagent } from 'Redux/agent';
import { Input } from 'antd';
import AutoComplement from 'components/AutoComplete';
import SelectLink from 'pages/Departement/Select';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddMember() {
  const [value, setValue] = React.useState('');
  const role = useSelector((state) => state.role.role);
  const [roleselect, setRoleselect] = React.useState('');
  const donner = ['suivi', 'operation'];
  const donnerMonitoring = ['region', 'shop', 'status', 'nothing'];
  const [type, setType] = React.useState('operation');
  const [monitoring, setMonitoring] = React.useState('');

  const [code, setCode] = React.useState('');
  const dispatch = useDispatch();

  const sendData = (e) => {
    e.preventDefault();

    const data = { nom: value, code, fonction: roleselect?.id, operation: type, monitoring };
    dispatch(Postagent(data));
    setCode('');
    setValue('');
    setRoleselect('');
    setType('operation');
  };

  return (
    <div style={{ width: '20rem', marginTop: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        {role && <AutoComplement value={roleselect} setValue={setRoleselect} options={role} title="Role" propr="title" />}
      </div>
      <div>
        <SelectLink label="Type" data={donner} value={type} setValue={setType} />
      </div>
      <div>
        <SelectLink label="Monitoring" data={donnerMonitoring} value={monitoring} setValue={setMonitoring} />
      </div>

      <div style={{ margin: '10px 0px' }}>
        <Input placeholder="Agent" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div style={{ margin: '10px 0px' }}>
        <Input placeholder="Code agent" value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div>
        <Button variant="contained" onClick={(e) => sendData(e)} color="primary" fullWidth>
          <Add fontSize="small" /> Ajouter
        </Button>
      </div>
    </div>
  );
}

export default AddMember;
