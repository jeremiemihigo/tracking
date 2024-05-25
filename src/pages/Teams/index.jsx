import MainCard from 'components/MainCard';
import React from 'react';
import { Grid, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import './style.css';
import Popup from 'static/Popup';
import AddTeams from './AddTeams';
import { config, lien_read } from 'static/Lien';
import axios from 'axios';
import AffecterAction from './AffecterAction';
import { Delete } from '../../../node_modules/@mui/icons-material/index';
import AddMember from './AddMembre';
import ConfirmDialog from 'components/ConfirmDialog';

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

  const deleteItem =()=>{

  }
  return (
    <MainCard>
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
                      {index.title} <Delete sx={{ cursor: 'pointer', marginLeft: '3px' }} color="error" fontSize="small" />
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
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Confirm Deletion',
                          subTitle: `this operation will delete ${index.nom} in this team`,
                          onConfirm: () => {
                            deleteItem(index._id);
                          }
                        });
                      }}
                      sx={{ cursor: 'pointer', marginLeft: '3px' }} color="error" fontSize="small" />
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
