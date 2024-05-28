import { Button } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import Input from 'components/Input';
import Selected from 'components/Selected';
import React from 'react';
import { config, lien_post } from 'static/Lien';

function AddTeams({ setTeams, team }) {
  const [title, setTitle] = React.useState('');
  const [value, setValue] = React.useState('');
  //title, action
  const option = [
    { id: 1, title: 'Call center', value: 'CALL CENTER MANAGER' },
    { id: 2, title: 'Portfolio manager', value: 'PORTFOLIO MANAGER' },
    { id: 3, title: 'Fraud Managment', value: 'FRAUD MANAGMENT' },
    { id: 4, title: 'Shop manager', value: 'SHOP MANAGER' },
    { id: 5, title: 'Responsable Shop', value: 'RS' }
  ];

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(lien_post + '/team', { title, role: value }, config);
      if (response.status === 200) {
        setTeams([response.data, ...team]);
        success('Opération effectuée', 'success');
      } else {
        success('' + response.data, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ width: '18rem' }}>
      {contextHolder}
      <div>
        <Input label="Title" setValue={setTitle} value={title} />
      </div>
      <div style={{ margin: '10px 0px' }}>
        <Selected label="Departement" data={option} value={value} setValue={setValue} />
      </div>

      <div>
        <Button onClick={(e) => sendData(e)} variant="contained" color="primary" fullWidth>
          Valider
        </Button>
      </div>
    </div>
  );
}
export default AddTeams;