import MainCard from 'components/MainCard';
import React from 'react';
import { Add } from '@mui/icons-material';
import Popup from 'static/Popup';
import AddMember from './AddMember';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Fab, Tooltip, Grid } from '@mui/material';
import { Block, RestartAlt } from '@mui/icons-material';
import _ from 'lodash';
import './style.css';
import { Badge } from '@mui/material';
import { message } from 'antd';
import { Reset } from 'Redux/agent';

function Index() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const liste = useSelector((state) => state.agent);
  const [dataAnalyse, setDataAnalyse] = React.useState();
  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };
  const analyse = () => {
    setDataAnalyse(_.groupBy(liste?.agent, 'role'));
  };
  React.useEffect(() => {
    analyse();
    if(liste.resetPassword === "success"){
      success('Mot de passe réinitialiser à 1234', "success")
    }
    if(liste.resetPassword === "rejected"){
      success(liste.resetPasswordError, "error")
    }
  }, [liste]);

  const resetPassword = async (id, e) => {
    e.preventDefault();
    try {
      dispatch(Reset(id))
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      field: 'codeAgent',
      headerName: 'Code Agent',
      width: 100,
      editable: false
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
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Tooltip onClick={(e) => resetPassword(params.row._id, e)} title="Réinitialisez ses accès" sx={{ margin: '10px' }}>
              <RestartAlt fontSize="small" />
            </Tooltip>
            <Tooltip title={params.row.active ? 'Bloquer' : 'Débloquer'}>
              <Block fontSize="small" />
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
          <Grid item lg={8}>
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
          <Grid item lg={4}>
            <div className="analyse">
              {dataAnalyse &&
                Object.keys(dataAnalyse).map((index, key) => {
                  return (
                    <div key={key}>
                      <div className="role">
                        <Badge badgeContent={dataAnalyse['' + index].length} color="primary">
                          {index}
                        </Badge>
                      </div>
                      {dataAnalyse['' + index].map((item, cle) => {
                        return (
                          <p className="name" key={item._id}>
                            {cle + 1}. {item.nom}
                          </p>
                        );
                      })}
                      <div></div>
                    </div>
                  );
                })}
            </div>
          </Grid>
        </Grid>
      </div>
      <Popup open={open} setOpen={setOpen} title="Ajoutez un agent">
        <AddMember />
      </Popup>
    </MainCard>
  );
}

export default Index;
