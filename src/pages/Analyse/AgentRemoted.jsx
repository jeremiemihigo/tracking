import MainCard from 'components/MainCard';
import React from 'react';
import { CreateContexte } from './Contexte';
import { useSelector } from 'react-redux';
import AutoComplement from 'components/AutoComplete';
import { Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { lien_post } from 'static/Lien';
import axios from 'axios';
import { message } from 'antd';
import SimpleBackdrop from 'components/Backdrop';
import ComponentClientObject from 'pages/Component/ComponentObject';

function AgentRemoted() {
  const { optionSelect } = React.useContext(CreateContexte);
  const agent = useSelector((state) => state.agent?.agent);
  const [agentSelect, setAgentSelect] = React.useState('');
  const [initiale, setInitiale] = React.useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = React.useState();
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
    const response = await axios.post(lien_post + '/remotedBy', {
      codeAgent: agentSelect.codeAgent,
      debut: initiale?.debut,
      fin: initiale?.fin
    });
    setLoad(false);
    if (response.status === 201) {
      success(response.data, 'error');
      setData();
    }
    if (response.status === 200) {
      setData(response.data);
      success('' + response.data.length + ' action(s) réalisée(s)', 'success');
    }
  };
  return (
    <div>
      {load && <SimpleBackdrop open={load} />}
      {contextHolder}
      <MainCard title="">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 'bolder',
              textTransform: 'uppercase',
              marginRight: '10px'
            }}
          >
            {optionSelect.title}
          </p>
          {agent && agent.length > 0 && (
            <div style={{ width: '30%', marginRight: '10px' }}>
              <AutoComplement value={agentSelect} setValue={setAgentSelect} options={agent} title="Agent" propr="nom" />
            </div>
          )}
          {agentSelect && (
            <>
              <TextField type="date" onChange={(e) => setInitiale({ ...initiale, debut: e.target.value })} />
              <TextField type="date" onChange={(e) => setInitiale({ ...initiale, fin: e.target.value })} sx={{ padding: '0px 5px' }} />
            </>
          )}
          {agentSelect && (
            <Button variant="contained" disabled={load} color="primary" onClick={(e) => loading(e)}>
              <Search fontSize="small" /> Chercher
            </Button>
          )}
        </div>
      </MainCard>
      {data && <ComponentClientObject data={data} />}
    </div>
  );
}

export default AgentRemoted;
