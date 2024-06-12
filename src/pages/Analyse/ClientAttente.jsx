/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Checkbox, FormControl, FormControlLabel, Grid } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import AnalyticEcommerce from 'components/AnalyticEcommerce';
import SimpleBackdrop from 'components/Backdrop';
import MainCard from 'components/MainCard';
import Selected from 'components/Selected';
import _ from 'lodash';
import ChatAnalyse from 'pages/Component/ChatAnalyse';
import Component_Client from 'pages/Component/Component_Client';
import React from 'react';
import { useSelector } from 'react-redux';
import { config, differenceDays, lien_read } from 'static/Lien';
import { CreateContexte } from './Contexte';
import AutoComplement from "components/AutoComplete.jsx"

function ClientAttente() {
  const { optionSelect } = React.useContext(CreateContexte);
  const [actionSelect, setOptionSelect] = React.useState('');
  const [roleSelect, setRoleSelect] = React.useState('');
  const role = useSelector((state) => state.role?.role);
  const [data, setData] = React.useState();
  const [open, setOpen] = React.useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte) => {
    messageApi.open({
      type: 'error',
      content: '' + texte,
      duration: 3
    });
  };

  const status = useSelector(state=>state.status?.status)
  const [statusEncours, setStatusEncours] = React.useState()
  

  const loadingClient = async () => {
    if (roleSelect !== '') {
      setOpen(true);
      setOptionSelect('');
      const response = await axios.get(`${lien_read}/analyseRole/${roleSelect}`, config);
      setOpen(false);
      if (response.status === 200) {
        setData(response.data);
      }
      if (response.status === 201) {
        success(response.data);
        setData();
      }
    }
  };

  React.useEffect(() => {
    loadingClient();
  }, [roleSelect]);
  const [choix, setChoix] = React.useState('client');
  const handleChange = (event) => {
    setChoix(event.target.name);
  };

  const [chats, setChats] = React.useState();
  const [analyse, setAnalyse] = React.useState();
  const [activeAction, setActiveAction] = React.useState();
  const deelineFunc = () => {
    if (data && data.length > 0) {
      let insla = 0;
      let outsla = 0;
      for (let i = 0; i < data.length; i++) {
        if (differenceDays(data[i].updatedAt, new Date()) > data[i].status.sla) {
          outsla = outsla + 1;
        } else {
          insla = insla + 1;
        }
      }
      setChats({ series: [insla, outsla], labels: ['insla', 'outsla'] });
      let groupe = _.groupBy(data, 'status.idStatus');
      let key = Object.keys(groupe);
      setActiveAction(key);
      setStatusEncours(status.filter(x=>key.includes(x.idStatus)))
      let table = [];
      for (let i = 0; i < key.length; i++) {
        table.push({
          action: key[i],
          visites: groupe['' + key[i]]
        });
      }
      setAnalyse(table);
    }
  };
  React.useEffect(() => {
    deelineFunc();
  }, [data]);

  const [newData, setNewData] = React.useState();

  React.useEffect(() => {
    if (data && actionSelect) {
      let d = data.filter((x) => x.status.idStatus === actionSelect?.idStatus);
      setNewData(d);
    } else {
      setNewData(data);
    }
  }, [actionSelect, data]);

 

  return (
    <div>
      <>{contextHolder}</>
      <MainCard title="">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontSize: '15px', fontWeight: 'bolder', textTransform: 'uppercase', marginRight: '10px' }}>{optionSelect.title}</p>
          <div style={{ width: '20%' }}>
            {role && role.length > 0 ? (
              <Selected label="Selectionnez le role" data={role} value={roleSelect} setValue={setRoleSelect} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          {statusEncours && (
            <div style={{ width: '30%', padding: '0px 5px' }}>
              <AutoComplement value={actionSelect} setValue={setOptionSelect} options={statusEncours} title="Statut" propr="title" />
            </div>
          )}

          {newData && newData.length > 1 && (
            <div style={{ width: '20%' }}>
              <p>{newData.length} customers are waiting </p>
            </div>
          )}
        </div>
      </MainCard>
      <Grid container>
        <Grid item lg={12}>
          {newData && choix === 'client' && <Component_Client data={newData} />}
        </Grid>
      </Grid>
      <SimpleBackdrop open={open} />
    </div>
  );
}

export default ClientAttente;
