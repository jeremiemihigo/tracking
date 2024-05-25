/* eslint-disable react/prop-types */
import { Save } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import TextArea from 'components/TextArea';
import AutoComplement from 'pages/Parametre/Etapes/Complement';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { config, lien_post } from 'static/Lien';
import './action.css';

function RenseignerFeedback({ donner }) {
  const { visites } = donner;

  const action = useSelector((state) => state.action?.action);

  const [areaValue, setAreaValue] = React.useState('');
  const [clientSelect, setClientSelect] = React.useState('');

  const [actionSelect, setActionSelect] = React.useState('');

  const handleClient = (client) => {
    setClientSelect(client);
  };
  const sendData = async (e) => {
    e.preventDefault();
    const data = {
      _idClient: clientSelect._id,

      ancienAction: clientSelect.action,

      customer_id: clientSelect.unique_account_id,
      commentaire: areaValue,
      action: actionSelect,
      role: clientSelect?.role[0]?.title,
      status: clientSelect?.status.title,
      dateDebut: clientSelect?.updatedAt
    };
    const response = await axios.post(lien_post + '/demandeFeedback', data, config);
    console.log(response);
    setClientSelect('');
    setAreaValue('');
  };

  return (
    <div style={{ width: '40rem' }}>
      <Grid container>
        <Grid item lg={3}>
          <Table>
            <tbody>
              {visites &&
                visites.map((index) => {
                  console.log(visites);
                  return (
                    <tr onClick={() => handleClient(index)} key={index._id}>
                      <td className={clientSelect && clientSelect._id === index._id ? 'select' : 'blacks'}>
                        <Typography component="p" noWrap sx={{ fontSize: '12px' }}>
                          {index?.UniqueID + ' ; '}
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }} noWrap>
                          Destination : {index.Destination}
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }} noWrap>
                          {index.shop_region}/{index.shop_name}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Grid>
        {clientSelect ? (
          <Grid item lg={9}>
            <div style={{ marginLeft: '50px' }}>
              {clientSelect !== '' && (
                <Grid sx={{ marginBottom: '10px' }}>
                  <p>code client : {clientSelect?.unique_account_id}</p>
                </Grid>
              )}

              {action ? (
                <Grid item lg={12} sx={{ marginTop: '10px' }}>
                  <AutoComplement value={actionSelect} setValue={setActionSelect} options={action} title="Action" propr="title" />
                </Grid>
              ) : (
                <p style={{ fontSize: '12px', textAlign: 'center' }}>Loading action...</p>
              )}

              <div style={{ marginTop: '10px' }}>
                <TextArea setValue={setAreaValue} value={areaValue} placeholder="Commentaire" />
              </div>
              <Grid item lg={12} sx={{ marginTop: '10px' }}>
                <Button color="primary" variant="contained" onClick={(e) => sendData(e)}>
                  <Save fontSize="small" />
                </Button>
              </Grid>
            </div>
          </Grid>
        ) : (
          <p style={{ textAlign: 'center', color: 'red', fontSize: '12px', fontWeight: 'bolder' }}>Selectionnez un client</p>
        )}
      </Grid>
    </div>
  );
}

export default RenseignerFeedback;
