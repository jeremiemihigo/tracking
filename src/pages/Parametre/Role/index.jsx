import MainCard from 'components/MainCard';
import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import Popup from 'static/Popup';
import AddRole from './AddRole';
import { useDispatch, useSelector } from 'react-redux';
import ReplyIcon from '@mui/icons-material/Reply';
import './style.css';
import AjouterMember from './AjouterMember';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { AddMembre } from 'Redux/Role';
import ConfirmDialog from 'components/ConfirmDialog';

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
  return (
    <MainCard title="Role" sx={{ position: 'relative' }}>
      <>
        <div style={{ position: 'absolute', right: '50px', top: '10px' }}>
          <Typography component="span" sx={{ cursor: 'pointer' }} className="warning" onClick={() => setOpen(true)}>
            Ajoutez un role
          </Typography>
        </div>
        <div>
          {role ? (
            role.map((index) => {
              return (
                <React.Fragment key={index._id}>
                  <div className="role">
                    <div>
                      <p className="title">{index.title}</p>
                    </div>
                    <div className="option">
                      <Tooltip title="Ajoutez les membres" onClick={(e) => functionMembre(e, index)}>
                        <ReplyIcon fontSize="small" />
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
                </React.Fragment>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
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
