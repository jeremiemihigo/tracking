/* eslint-disable react/prop-types */
// material-ui

// project import
// import ComponentSkeleton from './ComponentSkeleton';
import React from 'react';
import Popup from 'static/Popup';
import { Fab, Grid, Typography } from '@mui/material';
import { EditOutlined } from '@ant-design/icons';
import AddProcess from './AddProcess';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import MainCard from 'components/MainCard';
import AddStatus from '../Status/AddStatus';
import AddAction from 'pages/Parametre/Action/AddAction';
import { useNavigate } from 'react-router-dom';
// styles

// ============================|| ANT ICONS ||============================ //

const Process = ({ id }) => {
  const navigate = useNavigate();
  const process = useSelector((state) => state.process?.process);
  const [processSelect, setProcessSelect] = React.useState();
  const [openAction, setOpenAction] = React.useState(false);
  const [openStatus, setOpenStatus] = React.useState(false);
  const dispatch = useDispatch();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = React.useState('');
  const functionEdit = (texte, id) => {
    setDataEdit({ texte, id });
    setOpenEdit(true);
  };
  React.useEffect(() => {
    if (process.length > 0) {
      setProcessSelect(process.filter((x) => x.idMainProcess === id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);
  const [status, setStatus] = React.useState();
  const [statusSelect, setStatusSelect] = React.useState('');

  function addAction(e, select) {
    e.preventDefault();
    setStatusSelect(select?.idStatus);
    setOpenAction(true);
  }

  function DetailAction(select) {
    // setStatusSelect(select?.idStatus);
    // setDetail(true);
    navigate(`/${select?.idStatus}`, { replace: true });
  }

  return (
    <Grid container>
      <Grid item lg={7}>
        <MainCard>
          {processSelect && processSelect.length > 0 ? (
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Process</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {processSelect.map((index, key) => {
                  return (
                    <tr key={index._id} onClick={() => setStatus(index)} className="rows">
                      <td>{key + 1}</td>
                      <td>
                        {index.title}
                        <Typography component="p" sx={{ fontSize: '10px' }} noWrap>
                          {index.agent?.nom}
                        </Typography>
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
        </MainCard>
      </Grid>
      <Grid item lg={0.1}></Grid>
      <Grid item lg={4.9}>
        {status && (
          <MainCard title={status.title} sx={{ position: 'relative' }}>
            <>
              <Typography
                component="div"
                onClick={() => setOpenStatus(true)}
                style={{ position: 'absolute', top: '20px', right: '50px', cursor: 'pointer' }}
              >
                <EditOutlined />
              </Typography>
              {status.status.length > 0 ? (
                <ol>
                  {status &&
                    status.status.map((item) => {
                      return (
                        <li key={item._id}>
                          {item.title}{' '}
                          <Typography component="span" onClick={() => DetailAction(item)} className="action">
                            Details
                          </Typography>
                          <Typography component="span" className="action" onClick={(e) => addAction(e, item)}>
                            Add
                          </Typography>
                        </li>
                      );
                    })}
                </ol>
              ) : (
                <p>Aucun status</p>
              )}
            </>
          </MainCard>
        )}
      </Grid>

      <Popup open={openEdit} setOpen={setOpenEdit} title="Edit process">
        <AddProcess edit={dataEdit} />
      </Popup>
      {status && (
        <Popup open={openStatus} setOpen={setOpenStatus} title="Add status">
          <AddStatus idProcess={status?.idProcess} />
        </Popup>
      )}
      <Popup open={openAction} setOpen={setOpenAction} title="Add action">
        <AddAction status={statusSelect} />
      </Popup>
    </Grid>
  );
};

export default Process;
