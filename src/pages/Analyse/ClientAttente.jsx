/* eslint-disable react-hooks/exhaustive-deps */
import MainCard from 'components/MainCard';
import React from 'react';
import { CreateContexte } from './Contexte';
import { useSelector } from 'react-redux';
import Selected from 'components/Selected';
import { config, differenceDays, lien_read } from 'static/Lien';
import axios from 'axios';
import Component_Client from 'pages/Component/Component_Client';
import { Box, FormControl, Checkbox, FormControlLabel, Grid } from '@mui/material';
import ChatAnalyse from 'pages/Component/ChatAnalyse';
import AnalyticEcommerce from 'components/AnalyticEcommerce';
import _ from 'lodash';
import AutoComplement from 'pages/Component/AutoCompletementVide';
import SimpleBackdrop from 'components/Backdrop';
import { message } from 'antd';

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
        if (differenceDays(data[i].updatedAt, new Date()) > data[i].action.delai) {
          outsla = outsla + 1;
        } else {
          insla = insla + 1;
        }
      }
      setChats({ series: [insla, outsla], labels: ['insla', 'outsla'] });
      let groupe = _.groupBy(data, 'action.title');
      let key = Object.keys(groupe);
      setActiveAction(key);
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
      let d = data.filter((x) => x.action.title === actionSelect);
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
          {activeAction && (
            <div style={{ width: '30%', padding: '0px 5px' }}>
              <AutoComplement value={actionSelect} setValue={setOptionSelect} options={activeAction} title="Action" propr="" />
            </div>
          )}

          {newData && newData.length > 1 && (
            <div style={{ width: '20%' }}>
              <p>{newData.length} customers are waiting </p>
            </div>
          )}

          <div style={{ width: '30%', margin: '0px 20px' }}>
            <Box sx={{ display: 'flex' }}>
              <FormControl component="fieldset" variant="standard">
                <FormControlLabel
                  control={<Checkbox checked={choix === 'client'} onChange={handleChange} name="client" />}
                  label="Clients"
                />
              </FormControl>
              <FormControl required component="fieldset" variant="standard">
                <FormControlLabel
                  control={<Checkbox checked={choix === 'analyse'} onChange={handleChange} name="analyse" />}
                  label="Analysis"
                />
              </FormControl>
            </Box>
          </div>
        </div>
      </MainCard>
      <Grid container>
        <Grid item lg={12}>
          {newData && choix === 'client' && <Component_Client data={newData} />}
          {data && choix === 'analyse' && (
            <Grid container>
              <Grid item lg={4}>
                <MainCard title="Deedline">{data && choix === 'analyse' && <ChatAnalyse data={chats} />}</MainCard>
              </Grid>
              <Grid item lg={8}>
                <MainCard title="Analysis">
                  <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    {analyse &&
                      analyse.map((index) => {
                        return (
                          <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={4} lg={4} key={index.action}>
                            <AnalyticEcommerce title={index.action} count={index.visites.length} />
                          </Grid>
                        );
                      })}
                  </Grid>
                </MainCard>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <SimpleBackdrop open={open} />
    </div>
  );
}

export default ClientAttente;
