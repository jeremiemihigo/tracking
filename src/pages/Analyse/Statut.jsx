import MainCard from 'components/MainCard';
import React from 'react';
import { CreateContexte } from './Contexte';
import { Button } from '@mui/material';
import { Search } from '../../../node_modules/@mui/icons-material/index';
import { lien_post } from 'static/Lien';
import { message } from 'antd';
import axios from 'axios';
import Component_Client from 'pages/Component/Component_Client';
import { useSelector } from 'react-redux';
import AutoComplement from 'components/AutoComplete';
import SimpleBackdrop from 'components/Backdrop';

function Statut() {
  const { optionSelect } = React.useContext(CreateContexte);
  const action = useSelector((state) => state.action?.action);
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
      const response = await axios.post(lien_post + '/attenteStatut', { idAction: actionSelect?.idAction });
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
          {action && (
            <div style={{ width: '30%' }}>
              <AutoComplement
                value={actionSelect}
                options={action}
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
