/* eslint-disable react/prop-types */
import { Save } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { CreateContexteGlobal } from 'GlobalContext';
import TextArea from 'components/TextArea';
import _ from 'lodash';
import AutoComplement from 'pages/Parametre/Etapes/Complement';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import './action.css';

function RenseignerFeedback({ visites, changeAction }) {
  const { socket } = React.useContext(CreateContexteGlobal);
  const action = useSelector((state) => state.action?.action);
  const [areaValue, setAreaValue] = React.useState('');
  const [clientSelect, setClientSelect] = React.useState('');
  const [actionSelect, setActionSelect] = React.useState('');
  const user = useSelector((state) => state.user?.user);
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
      type: 'feedback',
      codeAgent: user?.codeAgent,
      action: actionSelect,
      role: clientSelect?.role[0]?.title,
      status: clientSelect?.status.title,
      dateDebut: clientSelect?.updatedAt
    };
    socket.emit('renseignefeedback', data);
    setClientSelect('');
    setAreaValue('');
    setActionSelect('');
  };
  const rechercheInfoCall = (table) => {
    let info = _.filter(table, { idAction: 'BXLMWU' });
    if (info.length > 0) {
      return {
        commentaire: info[0].commentaire,
        action: info[0].action,
        feedback: info[0].feedbackSelect
      };
    } else {
      return 'rien';
    }
  };
  return (
    <div style={{ width: '40rem' }}>
      <Grid container>
        <Grid item lg={3.5} className="resultTable">
          <Table>
            <tbody>
              {visites &&
                visites.map((index) => {
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
          <Grid item lg={8.5}>
            <div style={{ marginLeft: '50px' }}>
              {clientSelect !== '' && (
                <>
                  <p style={{ fontSize: '12px', marginBottom: '15px' }}>
                    ID : {clientSelect?.unique_account_id};{' ' + clientSelect?.customer_name}
                  </p>

                  <p style={{ fontSize: '12px', padding: '0px', margin: '0px' }}>
                    Visited :{' '}
                    {!clientSelect.visited || clientSelect?.visited === 'pending' ? (
                      <span
                        style={{
                          color: 'green'
                        }}
                      >
                        pending feedback
                      </span>
                    ) : (
                      clientSelect?.visited
                    )}{' '}
                  </p>
                  <ol>
                    <li style={{ fontSize: '11px' }}>ID agent : {clientSelect?.objectVisite?.codeAgent}</li>
                    <li style={{ fontSize: '11px' }}>ID visite : {clientSelect?.objectVisite?.idDemande}</li>
                    <li style={{ fontSize: '11px' }}>Feedback : {clientSelect?.objectVisite?.raison}</li>
                    <li style={{ fontSize: '11px' }}>Date : {clientSelect?.objectVisite?.dateSave.split('T')[0]}</li>
                  </ol>
                  <p style={{ fontSize: '12px', padding: '0px', margin: '0px' }}>
                    Called :{' '}
                    {!clientSelect.called || clientSelect?.called === 'pending' ? (
                      <span
                        style={{
                          color: 'green'
                        }}
                      >
                        pending feedback
                      </span>
                    ) : (
                      clientSelect?.called
                    )}{' '}
                  </p>
                  {rechercheInfoCall(clientSelect?.result) !== 'rien' && (
                    <>
                      <ol>
                        <li style={{ fontSize: '11px' }}>commentaire :{rechercheInfoCall(clientSelect?.result).commentaire}</li>
                        <li style={{ fontSize: '11px' }}>Feedback :{rechercheInfoCall(clientSelect?.result).feedback}</li>
                        <li style={{ fontSize: '11px' }}>Action :{rechercheInfoCall(clientSelect?.result).action}</li>
                      </ol>
                    </>
                  )}
                </>
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
