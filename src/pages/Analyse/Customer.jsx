import MainCard from 'components/MainCard';
import React from 'react';
import { CreateContexte } from './Contexte';
import { TextField, Button } from '../../../node_modules/@mui/material/index';
import { Search } from '../../../node_modules/@mui/icons-material/index';
import {  lien_post } from 'static/Lien';
import { message } from 'antd';
import axios from 'axios';
import Component_Client from 'pages/Component/Component_Client';

function Customer() {
  const { optionSelect } = React.useContext(CreateContexte);
  const [codeclient, setCode] = React.useState('');
  const [data, setData] = React.useState();
  const [messageApi, contextHolder] = message.useMessage();

  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  const loading = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(lien_post + '/analyseClient', { codeclient });
      if (response.status === 200) {
        setData(response.data);
      }
      if (response.status === 201) {
        success(response.data, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {contextHolder}
      <MainCard title="">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontSize: '15px', fontWeight: 'bolder', textTransform: 'uppercase', marginRight: '10px' }}>{optionSelect.title}</p>
          <div style={{ width: '30%' }}>
            <TextField onChange={(e) => setCode(e.target.value)} placeholder="Code client" fullWidth />
          </div>
          <div style={{ width: '30%', marginLeft: '10px' }}>
            <Button variant="contained" color="primary" onClick={(e) => loading(e)}>
              <Search fontSize="small" /> recherche
            </Button>
          </div>
        </div>
      </MainCard>
      {data && <Component_Client data={data} />}
    </div>
  );
}

export default Customer;
