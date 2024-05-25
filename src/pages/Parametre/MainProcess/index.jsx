// material-ui

// project import
// import ComponentSkeleton from './ComponentSkeleton';
import React from 'react';
import MainCard from 'components/MainCard';
import Popup from 'static/Popup';
import { Fab } from '@mui/material';
import { AppstoreAddOutlined, EditOutlined } from '@ant-design/icons';
import AddMainProcess from './AddMainProcess';
import { Tooltip } from '../../../../node_modules/@mui/material/index';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
// styles

// ============================|| ANT ICONS ||============================ //

const MainProcess = () => {
  const [open, setOpen] = React.useState(false);
  const main = useSelector((state) => state.main?.main);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = React.useState('');
  const functionEdit = (texte, id) => {
    setDataEdit({ texte, id });
    setOpenEdit(true);
  };
  console.log(main);
  const navigation = useNavigate();
  const Details = (id) => {
    navigation(`/details/${id}`);
  };
  return (
    <MainCard title="Main process">
      <Tooltip title="Click to add a main process">
        <Fab size="small" color="primary" onClick={() => setOpen(true)}>
          <AppstoreAddOutlined />
        </Fab>
      </Tooltip>
      {main && main.length > 0 ? (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Main Process</th>
              <th>SavedBy</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {main.map((index, key) => {
              return (
                <tr key={index._id}>
                  <td>{key + 1}</td>
                  <td>{index.title}</td>
                  <td>{index.agent?.nom}</td>
                  <td>
                    <ol>
                      {index.allProcess.map((item) => {
                        return <li key={item._id}>{item.title}</li>;
                      })}
                    </ol>
                  </td>
                  <td>
                    <Fab size="small" color="secondary" onClick={() => functionEdit(index.title, index._id)}>
                      <EditOutlined />
                    </Fab>
                    <Fab size="small" color="secondary" onClick={() => Details(index._id)}>
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

      <Popup open={open} setOpen={setOpen} title="Add a main process">
        <AddMainProcess />
      </Popup>
      <Popup open={openEdit} setOpen={setOpenEdit} title="Edit a main process">
        <AddMainProcess edit={dataEdit} />
      </Popup>
    </MainCard>
  );
};

export default MainProcess;
