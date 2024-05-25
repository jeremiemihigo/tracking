/* eslint-disable react-hooks/exhaustive-deps */
// material-ui

// project import
// import ComponentSkeleton from './ComponentSkeleton';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Edit, Settings } from '@mui/icons-material';
import { Fab, Tooltip, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import _ from 'lodash';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Popup from 'static/Popup';
import VisitedOrNo from '../Dossier/VisitedOrNo';
import AddAction from './AddAction';
import AddStatusLabel from './AddStatusLabel';
import './action.css';
// styles

// ============================|| ANT ICONS ||============================ //

const Actions = () => {
  const params = useParams();
  const { status } = params;
  const [openInitiale, setOpenInitiale] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const action = useSelector((state) => state.action?.action);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = React.useState('');
  const [openStatus, setOpenStatus] = React.useState(false);

  const [actions, setActions] = React.useState();

  React.useEffect(() => {
    if (action) {
      let a = _.filter(action, { idStatus: status });
      setActions(a);
    }
  }, [status, action]);

  const functionEdit = (texte) => {
    setDataEdit(texte);
    setOpenStatus(true);
  };
  return (
    <MainCard title={`les actions du status ${actions ? actions[0]?.status.title : ''}`} sx={{ marginTop: '10px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20px', cursor: 'pointer', right: '50px' }}>
        <Settings fontSize="small" onClick={() => setOpenInitiale(true)} />
      </div>
      <Tooltip title="Click to add action">
        <Fab size="small" color="primary" onClick={() => setOpen(true)}>
          <AppstoreAddOutlined />
        </Fab>
      </Tooltip>
      {actions && actions.length > 0 ? (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Action</th>
              <th>Delai</th>
              <th>Status</th>
              <th>label</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((index, key) => {
              return (
                <tr key={index._id}>
                  <td>{key + 1}</td>
                  <td>
                    {index.title}
                    <Typography component="p" className="actionTwo">
                      {index.roles[0]?.title}
                    </Typography>
                    {index.objectif && <p className="objectif">Object : {index.objectif}</p>}

                    <p className="objectif">ID action : {index.idAction}</p>
                  </td>
                  <td>{index.delai > 1 ? index.delai + ' jours' : index.delai + ' jour'}</td>
                  <td>
                    <ol>
                      {index.statusAction.map((item) => {
                        return <li key={item._id}>{item?.title.toLowerCase() + '; '}</li>;
                      })}
                    </ol>
                  </td>

                  <td>
                    <Tooltip title="Add label status">
                      <Edit fontSize="small" onClick={() => functionEdit(index)} />
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'blue', fontWeight: 'bolder' }}>Chargement...</p>
      )}
      {status && (
        <Popup open={open} setOpen={setOpen} title="Add status">
          <AddAction status={status} />
        </Popup>
      )}

      <Popup open={openEdit} setOpen={setOpenEdit} title="Edit status">
        <AddAction edit={dataEdit} />
      </Popup>
      <Popup open={openStatus} setOpen={setOpenStatus} title="Status Label">
        <AddStatusLabel action={dataEdit} />
      </Popup>
      <Popup open={openInitiale} setOpen={setOpenInitiale} title="Parametre">
        <VisitedOrNo />
      </Popup>
    </MainCard>
  );
};

export default Actions;
