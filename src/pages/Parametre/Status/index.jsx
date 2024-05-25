// material-ui

// project import
// import ComponentSkeleton from './ComponentSkeleton';
import React from 'react';
import MainCard from 'components/MainCard';
import Popup from 'static/Popup';
import { Fab } from '@mui/material';
import { AppstoreAddOutlined, EditOutlined } from '@ant-design/icons';
import AddStatus from './AddStatus';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
// styles

// ============================|| ANT ICONS ||============================ //

const Status = () => {
  const [open, setOpen] = React.useState(false);
  const status = useSelector((state) => state.status?.status);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = React.useState('');
  const functionEdit = (texte, id) => {
    setDataEdit({ texte, id });
    setOpenEdit(true);
  };
  return (
    <MainCard title="Ant Icons">
      <Tooltip title="Click to add a status">
        <Fab size="small" color="primary" onClick={() => setOpen(true)}>
          <AppstoreAddOutlined />
        </Fab>
      </Tooltip>
      {status.length > 0 ? (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>SavedBy</th>
              <th>Process</th>
              <th>Actions</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {status.map((index, key) => {
              return (
                <tr key={index._id}>
                  <td>{key + 1}</td>
                  <td>{index.title}</td>
                  <td>{index.agent?.nom}</td>
                  <td>{index.process?.title}</td>

                  <td>
                    <ol>
                      {index.action?.map((item) => {
                        return <li key={item._id}>{item.title}</li>;
                      })}
                    </ol>
                  </td>
                  <td>
                    <Fab size="small" color="secondary" onClick={() => functionEdit(index.title, index._id)}>
                      <EditOutlined />
                    </Fab>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'blue', fontWeight: 'bolder' }}>Chargement...</p>
      )}

      <Popup open={open} setOpen={setOpen} title="Add status">
        <AddStatus />
      </Popup>
      <Popup open={openEdit} setOpen={setOpenEdit} title="Edit status">
        <AddStatus edit={dataEdit} />
      </Popup>
    </MainCard>
  );
};

export default Status;
