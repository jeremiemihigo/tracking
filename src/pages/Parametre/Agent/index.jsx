import { Add, Block, RestartAlt } from '@mui/icons-material';
import { Fab, Grid, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Reset } from 'Redux/agent';
import { message } from 'antd';
import Dot from 'components/@extended/Dot';
import MainCard from 'components/MainCard';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'static/Popup';
import AddMember from './AddMember';
import AddRegion from './AddRegion';
import AddShop from './Shop';
import './style.css';

function Index() {
  const [open, setOpen] = React.useState(false);
  const [openregion, setOpenregion] = React.useState(false);
  const [openshop, setOpenshop] = React.useState(false);
  const dispatch = useDispatch();
  const liste = useSelector((state) => state.agent);
  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  React.useEffect(() => {
    if (liste.resetPassword === 'success') {
      success('Mot de passe réinitialiser à 1234', 'success');
    }
    if (liste.resetPassword === 'rejected') {
      success(liste.resetPasswordError, 'error');
    }
  }, [liste]);

  const resetPassword = async (id, e) => {
    e.preventDefault();
    try {
      dispatch(Reset(id));
    } catch (error) {
      console.log(error);
    }
  };
  const [agentselect, setagentselect] = React.useState('');
  const functionagentadd = (d, e) => {
    e.preventDefault();
    setOpenregion(true);
    setagentselect(d);
  };
  const functionshop = (d, e) => {
    e.preventDefault();
    setOpenshop(true);
    setagentselect(d);
  };
  const columns = [
    {
      field: 'codeAgent',
      headerName: 'Code Agent',
      width: 100,
      editable: false
    },
    {
      field: 'log',
      headerName: 'First Log',
      width: 30,
      editable: false,
      renderCell: (params) => {
        return params.row.first ? <Dot color="warning" /> : <Dot color="success" />;
      }
    },
    {
      field: 'nom',
      headerName: 'Nom',
      width: 180,
      editable: false
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 180,
      editable: false
    },
    {
      field: 'shop',
      headerName: 'Shop',
      width: 100,
      editable: false,
      renderCell: (params) => {
        return params.row.shop !== 'false' && params.row.shop;
      }
    },
    {
      field: 'region',
      headerName: 'Region',
      width: 100,
      editable: false,
      renderCell: (params) => {
        return params.row.region !== 'false' && params.row.region;
      }
    },
    {
      field: 'options',
      headerName: 'Options',
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Tooltip onClick={(e) => resetPassword(params.row._id, e)} title="Réinitialisez ses accès">
              <Fab size="small">
                <RestartAlt fontSize="small" />
              </Fab>
            </Tooltip>
            <Tooltip title={params.row.active ? 'Bloquer' : 'Débloquer'} sx={{ margin: '0px 10px' }}>
              <Fab size="small">
                <Block fontSize="small" />
              </Fab>
            </Tooltip>
            <Tooltip title="Add Region" onClick={(e) => functionagentadd(params.row, e)}>
              <Fab size="small">
                <Add fontSize="small" />
              </Fab>
            </Tooltip>
            <Tooltip title="Add shop" sx={{ marginLeft: '10px' }} onClick={(e) => functionshop(params.row, e)}>
              <Fab size="small">
                <Add fontSize="small" />
              </Fab>
            </Tooltip>
          </>
        );
      }
    }
  ];

  return (
    <MainCard title="Agents" sx={{ position: 'relative' }}>
      {contextHolder}
      <div style={{ position: 'absolute', right: '50px', top: '10px' }}>
        <Fab size="small" color="primary" onClick={() => setOpen(true)}>
          <Add fontSize="small" />
        </Fab>
      </div>
      <div>
        <Grid container>
          <Grid item lg={12}>
            {liste && liste?.agent.length > 0 && (
              <DataGrid
                rows={liste.agent}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10
                    }
                  }
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
              />
            )}
          </Grid>
        </Grid>
      </div>
      <Popup open={open} setOpen={setOpen} title="Add an agent">
        <AddMember />
      </Popup>
      {agentselect && (
        <Popup open={openregion} setOpen={setOpenregion} title="Add Region">
          <AddRegion donner={agentselect} />
        </Popup>
      )}
      {agentselect && (
        <Popup open={openshop} setOpen={setOpenshop} title="Add Shop">
          <AddShop donner={agentselect} />
        </Popup>
      )}
    </MainCard>
  );
}

export default Index;
