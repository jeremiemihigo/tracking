import { Button } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import AutoComplement from 'components/AutoComplete';
import SimpleBackdrop from 'components/Backdrop';
import MainCard from 'components/MainCard';
import Component_Client from 'pages/Component/Component_Client';
import React from 'react';
import { useSelector } from 'react-redux';
import { lien_post } from 'static/Lien';
import { Search } from '../../../node_modules/@mui/icons-material/index';
import { CreateContexte } from './Contexte';

function Statut() {
  const { optionSelect } = React.useContext(CreateContexte);
  const status = useSelector((state) => state.status.status);
  const [actionSelect, setActionSelect] = React.useState('');
  const [data, setData] = React.useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = React.useState(false);

  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  const loading = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const response = await axios.post(lien_post + '/attenteStatut', { idStatus: actionSelect?.idStatus });
      setLoad(false);
      if (response.status === 200) {
        setData(response.data);
      }
      if (response.status === 201) {
        success(response.data, 'error');
        setData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {contextHolder}
      <SimpleBackdrop open={load} />
      <MainCard title="">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontSize: '15px', fontWeight: 'bolder', textTransform: 'uppercase', marginRight: '10px' }}>{optionSelect.title}</p>
          {status && (
            <div style={{ width: '30%' }}>
              <AutoComplement
                value={actionSelect}
                options={status}
                setValue={setActionSelect}
                title="Selectionnez un statut"
                propr="title"
              />
            </div>
          )}

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

export default Statut;
