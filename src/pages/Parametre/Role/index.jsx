import { Add, Edit } from '@mui/icons-material';
import { Fab, Grid, Tooltip } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { AddMembre } from 'Redux/Role';
import ConfirmDialog from 'components/ConfirmDialog';
import MainCard from 'components/MainCard';
import AddLink from 'pages/Departement/AddLink';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'static/Popup';
import AddRole from './AddRole';
import AjouterMember from './AjouterMember';
import './style.css';

function Index() {
  const [open, setOpen] = React.useState(false);
  const role = useSelector((state) => state.role?.role);
  const [openMembre, setOpenMembre] = React.useState(false);
  const [roleSelect, setRoleSelect] = React.useState();
  const dispatch = useDispatch();

  function functionMembre(e, index) {
    e.preventDefault();
    setRoleSelect(index);
    setOpenMembre(true);
  }
  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const handleDelete = (role, membre) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    let d = { code: membre, id: role, object: 'delete' };
    dispatch(AddMembre(d));
  };
  const [dataEdit, setDataEdit] = React.useState('');
  const [openEdit, setOpenEdit] = React.useState(false);
  const editing = (e, d) => {
    e.preventDefault();
    setDataEdit(d);
    setOpenEdit(true);
  };
  return (
    <MainCard>
      <>
        <Fab size="small" onClick={() => setOpen(true)} color="primary" sx={{ marginBottom: '12px' }}>
          <Add fontSize="small" />
        </Fab>

        <Grid container>
          {role ? (
            role.map((index) => {
              return (
                <Grid item lg={6} key={index._id} sx={{ paddingRight: '5px' }}>
                  <div className="role" style={{ backgroundColor: index.color || '#b2bee8' }}>
                    <div>
                      <p className="title">{index.title}</p>
                    </div>
                    <div className="option">
                      <Tooltip title="Modifiez" onClick={(e) => editing(e, index)}>
                        <Fab size="small">
                          <Edit fontSize="small" />
                        </Fab>
                      </Tooltip>
                      <Tooltip title="Ajoutez les membres" onClick={(e) => functionMembre(e, index)}>
                        <Fab size="small">
                          <Add fontSize="small" />
                        </Fab>
                      </Tooltip>
                    </div>
                  </div>
                  <Stack direction="row" spacing={1}>
                    {index.agents.map((item) => {
                      return (
                        <Chip
                          key={item._id}
                          label={item.nom}
                          onDelete={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: 'Confirmer la suppression de cet agent',
                              subTitle: 'Supprimer',
                              onConfirm: () => {
                                handleDelete(index._id, item.codeAgent);
                              }
                            });
                          }}
                        />
                        // <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
                      );
                    })}
                  </Stack>
                </Grid>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </Grid>
        <Grid>
          <AddLink />
        </Grid>
        <Popup open={openEdit} setOpen={setOpenEdit} title="Edit Role">
          <AddRole edit={dataEdit} />
        </Popup>
        <Popup open={open} setOpen={setOpen} title="Ajoutez un role">
          <AddRole />
        </Popup>
        <Popup open={openMembre} setOpen={setOpenMembre} title="Ajoutez un agent">
          <AjouterMember role={roleSelect} />
        </Popup>
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      </>
    </MainCard>
  );
}

export default Index;
