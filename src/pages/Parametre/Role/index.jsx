import { Add, Edit } from '@mui/icons-material';
import { Grid, Tooltip } from '@mui/material';
import Chip from '@mui/material/Chip';
import { AddMembre } from 'Redux/Role';
import ConfirmDialog from 'components/ConfirmDialog';
import MainCard from 'components/MainCard';
// import AddLink from 'pages/Departement/AddLink';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'static/Popup';
import AddRole from './AddRole';
import AjouterMember from './AjouterMember';
import './style.css';

function Index() {
  // const [open, setOpen] = React.useState(false);
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
        {/* <p style={{ marginBottom: '10px', color: 'blue', cursor: 'pointer' }} onClick={() => setOpen(true)}>
          Ajoutez un role
        </p> */}
        <Grid container>
          {role ? (
            role.map((index) => {
              return (
                <Grid item lg={6} xs={12} sm={6} md={6} key={index._id} sx={{ paddingRight: '5px' }}>
                  <div className="role" style={{ backgroundColor: index.color || '#b2bee8' }}>
                    <div>
                      <p className="title">{index.title}</p>
                      <p style={{ padding: '0px', margin: '0px', fontSize: '10px' }}>{index.link && `/${index.link}`}</p>
                    </div>
                    <div className="option">
                      <div>
                        <Tooltip title="Modifiez" onClick={(e) => editing(e, index)}>
                          <Edit fontSize="small" />
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip title="Ajoutez un agent" onClick={(e) => functionMembre(e, index)}>
                          <Add fontSize="small" />
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  <div style={{ width: '100%' }}>
                    {index.agents.map((item) => {
                      return (
                        <Chip
                          sx={{ margin: '2px' }}
                          key={item._id}
                          label={item.codeAgent}
                          onDelete={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: `si vous confirmez, ${item.codeAgent.toUpperCase()} ne verra plus les clients en attente dans ce departement`,
                              subTitle: '',
                              onConfirm: () => {
                                handleDelete(index._id, item.codeAgent);
                              }
                            });
                          }}
                        />
                      );
                    })}
                  </div>
                </Grid>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </Grid>
        {/* <Grid>{user && user.role === 'SUPER USER' && <AddLink />}</Grid> */}
        <Popup open={openEdit} setOpen={setOpenEdit} title="Edit Role">
          <AddRole edit={dataEdit} />
        </Popup>
        {/* <Popup open={open} setOpen={setOpen} title="Ajoutez un role">
          <AddRole />
        </Popup> */}
        <Popup open={openMembre} setOpen={setOpenMembre} title="Ajoutez un agent">
          <AjouterMember role={roleSelect} />
        </Popup>
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      </>
    </MainCard>
  );
}

export default Index;
