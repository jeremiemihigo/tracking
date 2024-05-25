import { Fab, Grid, Paper, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { message } from 'antd';
import axios from 'axios';
import MainCard from 'components/MainCard';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { config, lien_read, returnCategorie } from 'static/Lien';
import Popup from 'static/Popup';
import OpenResult from './OpenResult';

function AllCustomer() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const user = useSelector((state) => state.user?.user);
  const [dataOpen, setDataOpen] = React.useState();

  function openResu(index) {
    setDataOpen(index);
    setOpen(true);
  }
  const [team, setTeam] = React.useState();
  const loading = async () => {
    try {
      if (returnCategorie(user?.role) === 'managment') {
        const response = await axios.get(lien_read + '/readManagment', config);
        const team = await axios.get(`${lien_read}/teamrole/${user?.role}`, config);
        document.getElementById('leftContent').textContent = `${response.data.length} customers are waiting`;
        setData(response.data);
        setTeam(team.data);
      }
      if (returnCategorie(user?.role) !== 'managment') {
        const response = await axios.get(lien_read + '/clientField', config);
        setData(response.data);
        document.getElementById('leftContent').textContent = `${response.data.length} customers are waiting`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [analyseField, setAnalyseField] = React.useState();
  const [analyseZbm, setAnalyseZbm] = React.useState();

  const allAnalyse = () => {
    if (returnCategorie(user?.role) === 'field') {
      const action = Object.keys(_.groupBy(data, 'action.title'));
      const region = Object.keys(_.groupBy(data, 'shop_region'));
      setAnalyseField({ action, region });
    }
    if (user?.role === 'ZBM') {
      const shop = Object.keys(_.groupBy(data, 'shop_name'));
      const action = Object.keys(_.groupBy(data, 'action.title'));
      setAnalyseZbm({ action, shop });
    }
  };
  React.useEffect(() => {
    if (data) {
      allAnalyse();
    }
  }, [data, user]);
  React.useEffect(() => {
    if (user) {
      loading();
    }
  }, [user]);

  const columns = [
    {
      field: 'unique_account_id',
      headerName: 'code client',
      width: 120,
      editable: false
    },
    {
      field: 'customer_name',
      headerName: 'NOMS',
      width: 150,
      editable: false
    },
    {
      field: 'shop_name',
      headerName: 'Shop',
      width: 100,
      editable: false
    },
    {
      field: 'shop_region',
      headerName: 'Region',
      width: 100,
      editable: false
    },
    {
      field: 'payment_status',
      headerName: 'Payment status',
      width: 80,
      editable: false
    },
    {
      field: 'par_to_date',
      headerName: 'PAR',
      width: 80,
      editable: false
    },
    {
      field: 'actionTitle',
      headerName: 'Action',
      width: 180,
      editable: false
    },
    {
      field: 'In',
      headerName: 'In charge',
      width: 130,
      editable: false,
      renderCell: (params) => {
        return params.row.client.length > 0 ? (
          params.row.client[0]?.person_in_charge
        ) : (
          <p style={{ color: 'red' }}>does not exist in data to track</p>
        );
      }
    },
    {
      field: 'a',
      headerName: '',
      width: 30,
      editable: false,
      renderCell: (params) => {
        return (
          <Fab size="small" color="primary" onClick={() => openResu(params.row.result)}>
            {params.row.result.length}
          </Fab>
        );
      }
    }
  ];

  const rechercheNombre = (lieu, action, type) => {
    if (type === 'shop') {
      return data.filter((x) => x.action.title === action && x.shop_name === lieu);
    }
    if (type === 'region') {
      return data.filter((x) => x.action.title === action && x.shop_region === lieu);
    }
  };
  const retournTotal = (region) => {
    return data.filter((x) => x.shop_region === region);
  };

  const navigate = useNavigate();
  const functionListe = (region, action, type) => {
    let client = rechercheNombre(region, action, type);
    navigate('/liste', { state: { visites: client, action } });
  };

  const action = useSelector((state) => state.action?.action);

  const retournForTeam = (action) => {
    return data.filter((x) => x.actionEnCours === action);
  };
  const retournActionTitle = (actionId) => {
    return _.filter(action, { idAction: actionId })[0]?.title;
  };
  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };
  const navigationManagment = (action) => {
    const datas = {
      actions: retournActionTitle(action),
      clients: _.filter(data, { actionEnCours: action })
    };
    if (datas.clients.length > 0) {
      navigate('/liste', { state: { visites: datas.clients, action: datas.actions } });
    } else {
      success('no customers for this status', 'error');
    }
  };

  const returnRole = (item) => {
    if (action) {
      let roles = action.filter((x) => x.title === item)[0]?.roles;
      if (roles.length > 0) {
        return action.filter((x) => x.title === item)[0]?.roles[0].title;
      } else {
        return 'maybe a household visit';
      }
    } else {
      return 'maybe a household visit';
    }
  };

  return (
    <div>
      {contextHolder}
      <MainCard title="">
        <Grid container>
          {analyseField &&
            returnCategorie(user?.role) === 'field' &&
            analyseField.region.map((index, key) => {
              return (
                <Grid key={key} lg={2} xs={12}>
                  <Grid
                    sx={{
                      padding: '5px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: '#002d72',
                      color: '#fff',
                      margin: '3px'
                    }}
                  >
                    <p>{index}</p>
                    <p>{retournTotal(index).length}</p>
                  </Grid>
                  <Grid container>
                    {analyseField.action.map((action) => {
                      return (
                        rechercheNombre(index, action, 'region').length > 0 && (
                          <Grid
                            item
                            lg={12}
                            key={action}
                            sx={{ padding: '2px', cursor: 'pointer' }}
                            onClick={() => functionListe(index, action, 'region')}
                          >
                            <Tooltip title={action}>
                              <Paper elevation={2} sx={{ padding: '5px' }}>
                                <Typography noWrap style={{ fontSize: '11px', textAlign: 'center', fontWeight: 700 }}>
                                  {action}
                                </Typography>

                                <Typography component="p" sx={{ fontSize: '9px', textAlign: 'center', padding: '0px', margin: '0px' }}>
                                  {returnRole(action)}
                                </Typography>
                                <p style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}>
                                  {rechercheNombre(index, action, 'region').length}
                                </p>
                              </Paper>
                            </Tooltip>
                          </Grid>
                        )
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
        <Grid container>
          {analyseZbm &&
            user?.role === 'ZBM' &&
            analyseZbm.shop.map((shop, key) => {
              return (
                <Grid key={key} lg={3} sx={{ paddingLeft: '1px' }}>
                  <Grid sx={{ backgroundColor: '#002d72', borderRadius: '2px', textAlign: 'center', color: '#fff' }}>
                    <Typography component="p" noWrap>
                      {shop}
                    </Typography>
                  </Grid>
                  <Grid container>
                    {analyseZbm.action.map((action) => {
                      return (
                        rechercheNombre(shop, action, 'shop').length > 0 && (
                          <Grid
                            item
                            lg={12}
                            md={6}
                            key={action}
                            sx={{ padding: '2px', cursor: 'pointer' }}
                            onClick={() => functionListe(shop, action, 'shop')}
                          >
                            <Paper>
                              <p style={{ fontSize: '11px', textAlign: 'center' }}>{action}</p>
                              <Typography component="p" sx={{ fontSize: '9px', textAlign: 'center', padding: '0px', margin: '0px' }}>
                                {returnRole(action)}
                              </Typography>
                              <p style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}>
                                {rechercheNombre(shop, action, 'shop').length}
                              </p>
                            </Paper>
                          </Grid>
                        )
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })}
        </Grid>

        {data && data.length > 0 && returnCategorie(user?.role) === 'team' && (
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15
                }
              }
            }}
            pageSizeOptions={[15]}
            disableRowSelectionOnClick
          />
        )}
        {data &&
          data.length > 0 &&
          returnCategorie(user?.role) === 'managment' &&
          team &&
          team.length > 0 &&
          team.map((index) => {
            return (
              <div key={index._id}>
                <Grid sx={{ padding: '5px', backgroundColor: '#002d72', color: '#fff', fontWeight: 'bolder', margin: '5px' }}>
                  <>{index.title}</>
                </Grid>
                <Grid container>
                  {index.actions.map((action) => {
                    return (
                      <Grid item lg={3} key={action} sx={{ padding: '2px', cursor: 'pointer' }} onClick={() => navigationManagment(action)}>
                        <MainCard title={retournActionTitle(action)}>
                          <p style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}>{retournForTeam(action).length}</p>
                        </MainCard>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            );
          })}
      </MainCard>
      {dataOpen && (
        <Popup open={open} setOpen={setOpen} title="Result">
          <OpenResult data={dataOpen} />
        </Popup>
      )}
    </div>
  );
}
export default AllCustomer;
