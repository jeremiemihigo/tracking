import { Add } from '@mui/icons-material';
import { Fab, Grid } from '@mui/material';
import { message } from 'antd';
import warning from 'assets/notification/warning.mp3';
import axios from 'axios';
import ConfirmDialog from 'components/ConfirmDialog';
import MainCard from 'components/MainCard';
import React from 'react';
import { config, lien_post, lien_read } from 'static/Lien';
import Popup from 'static/Popup';
import { Delete } from '../../../node_modules/@mui/icons-material/index';
import AddMember from './AddMembre';
import AddTeams from './AddTeams';
import AffecterAction from './AffecterAction';
import './style.css';

function Index() {
  const [open, setOpen] = React.useState(false);
  const [teams, setTeams] = React.useState([]);
  const [loadingTem, setLoading] = React.useState(false);
  const [openAction, setOpenAction] = React.useState(false);
  const [openMember, setOpenMember] = React.useState(false);
  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });

  const loadingTeam = async () => {
    try {
      setLoading(true);
      const response = await axios.get(lien_read + '/team', config);
      if (response.status === 200) {
        setTeams(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadingTeam();
  }, []);
  const [dataTeam, setDataTeam] = React.useState();
  const laodingOneTeam = async (id, e) => {
    try {
      e.preventDefault();
      const response = await axios.get(`${lien_read}/oneTeam/${id}`);
      if (response.status === 200) {
        setDataTeam(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  const deleteAction = async (item, valeur) => {
    const result = await axios.post(lien_post + '/deleteaction', { document: valeur, idAction: item }, config);
    if (result.status === 200) {
      success('Deletion completed successfully', 'success');
    } else {
      success('' + result.data, 'error');
    }
  };
  const deleteAgent = async (item) => {
    const result = await axios.post(lien_post + '/deletememberteam', { id: item }, config);
    if (result.status === 200) {
      success('Deletion completed successfully', 'success');
    } else {
      success('' + result.data, 'error');
    }
  };
  return (
    <MainCard>
      {contextHolder}
      <Grid container>
        <Grid item lg={4}>
          <Grid className="gridAdd" sx={{ border: '2px dashed black' }} onClick={() => setOpen(true)}>
            <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bolder' }}>
              <Add />
              <p>clic here to add a new team</p>
            </div>
          </Grid>
          {loadingTem && <p style={{ textAlign: 'center', fontSize: '11px', marginTop: '20px' }}>Loading...</p>}
          <Grid>
            {teams.map((index) => {
              return (
                <Grid key={index._id} className="team" onClick={(e) => laodingOneTeam(index._id, e)}>
                  <p className="titleTeam">{index.title}</p>
                  <p className="actionTeam">{index.actions?.length > 0 ? 'Action : ' + index.actions?.length : 'Aucune action'}</p>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item lg={8}>
          {dataTeam && dataTeam.length > 0 && (
            <>
              <div className="divTitle">
                <p>Actions</p>
                <Fab size="small" sx={{ position: 'absolute', right: '10px' }} onClick={() => setOpenAction(true)}>
                  <Add fontSize="small" />
                </Fab>
              </div>
              <ol style={{ marginLeft: '20px' }}>
                {dataTeam[0]?.action.map((index) => {
                  return (
                    <li key={index._id}>
                      {index.title}
                      <Delete
                        sx={{ cursor: 'pointer', marginLeft: '3px' }}
                        onClick={() => {
                          let audio = new Audio(warning);
                          audio.play();
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Deleting an action',
                            subTitle: `this operation will delete the action << ${index.title} >> in this team `,
                            onConfirm: () => {
                              deleteAction(index.idAction, dataTeam[0]?._id);
                            }
                          });
                        }}
                        color="error"
                        fontSize="small"
                      />
                    </li>
                  );
                })}
              </ol>
              <div className="divTitle">
                <p>Members</p>
                <Fab onClick={() => setOpenMember(true)} size="small" sx={{ position: 'absolute', right: '10px' }}>
                  <Add fontSize="small" />
                </Fab>
              </div>
              <ol style={{ marginLeft: '20px', fontSize: '12px', fontWeight: 700 }}>
                {dataTeam[0]?.agents.map((index) => {
                  return (
                    <li key={index._id}>
                      {index.nom}
                      <Delete
                        onClick={() => {
                          let audio = new Audio(warning);
                          audio.play();
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Deletion of an agent',
                            subTitle: `this operation will delete << ${index.nom} >> in this team`,
                            onConfirm: () => {
                              deleteAgent(index._id);
                            }
                          });
                        }}
                        sx={{ cursor: 'pointer', marginLeft: '3px' }}
                        color="error"
                        fontSize="small"
                      />
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </Grid>
      </Grid>
      <Popup open={open} setOpen={setOpen} title="New team">
        <AddTeams setTeams={setTeams} team={teams} />
      </Popup>
      {dataTeam && (
        <Popup open={openAction} setOpen={setOpenAction} title="Ajoutez une action">
          <AffecterAction value={dataTeam[0]} />
        </Popup>
      )}
      {dataTeam && (
        <Popup open={openMember} setOpen={setOpenMember} title="Ajoutez un agent">
          <AddMember value={dataTeam[0]} />
        </Popup>
      )}
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </MainCard>
  );
}
export default Index;
