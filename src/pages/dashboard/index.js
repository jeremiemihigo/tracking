/* eslint-disable react-hooks/exhaustive-deps */
// material-ui
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { message } from 'antd';
import NofificationAudio from 'assets/notification/error.mp3';
import axios from 'axios';
import Dot from 'components/@extended/Dot';
import AnalyticEcommerce from 'components/AnalyticEcommerce';
import LoaderGif from 'components/LoaderGif';
import MainCard from 'components/MainCard';
import _ from 'lodash';
import Contexte from 'pages/TakeAction/Contexte';
import Liste from 'pages/TakeAction/Liste';
import RenseignerFeedback from 'pages/TakeAction/RenseignerFeedback';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { config, differenceDays, lien_read, returnCategorie } from 'static/Lien';
import Popup from 'static/Popup';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
// import Notification from "components/Notification"

// assets

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState();
  const now = useSelector((state) => state.today?.today);

  const [data, setData] = React.useState([]);
  const user = useSelector((state) => state.user?.user);
  console.log(user.role);

  React.useEffect(() => {
    if (user && returnCategorie(user.role) === 'team') {
      console.log('');
    } else {
      window.location.replace('/analyse');
    }
  }, [user]);

  const loadingClient = async () => {
    try {
      const response = await axios.get(lien_read + '/clientField', config);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadingClient();
  }, []);

  const couleur = (date1, delai) => {
    let n = (differenceDays(date1, new Date()) * 100) / delai;
    if (n > 0 && n < 50) {
      return 'success';
    }
    if (n > 50 && n < 80) {
      return 'primary';
    }
    if (n > 80 && n < 100) {
      return 'warning';
    }
    if (n > 100) {
      return 'error';
    }
  };
  const couleurAll = (allData) => {
    let nombreIn = 0;
    let nombreOut = 0;
    let today = 0;
    for (let i = 0; i < allData.visites.length; i++) {
      if (differenceDays(allData.visites[i].updatedAt, now?.datetime) === 0) {
        today = today + 1;
      } else {
        if (differenceDays(allData.visites[i].updatedAt, now?.datetime) < allData.visites[i].action.delai) {
          nombreIn = nombreIn + 1;
        } else {
          nombreOut = nombreOut + 1;
        }
      }
    }
    let pourcentage = ((nombreIn + today) * 100) / allData.visites.length;
    return { pourcentage, today, nombreIn, nombreOut };
  };

  const columns = [
    {
      field: 'unique_account_id',
      headerName: 'ID',
      width: 110,
      editable: false
    },
    {
      field: 'customer_name',
      headerName: 'customer_name',
      width: 110,
      editable: false
    },
    {
      field: 'payment_status',
      headerName: 'payment_status',
      width: 80,
      editable: false
    },

    {
      field: 'shop_region',
      headerName: 'Region',
      width: 80,
      editable: false
    },
    {
      field: 'shop_name',
      headerName: 'Shop',
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
      field: 'INSLA',
      headerName: 'Status',
      width: 85,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center', height: '100%' }} alignItems="center">
            <Dot color={couleur(params.row.updatedAt, params.row.action?.delai)} />
            <Typography sx={{ fontSize: '12px' }}>
              {differenceDays(params.row.updatedAt, new Date()) > params.row.action?.delai ? 'OUTSLA' : 'INSLA'}
            </Typography>
          </Stack>
        );
      }
    },
    {
      field: 'cumul',
      headerName: 'Cumul',
      width: 50,
      editable: false,
      renderCell: (params) => {
        return params.row.action?.delai - differenceDays(params.row.updatedAt, new Date());
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return params.row.action?.title;
      }
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 100,
      editable: false,
      renderCell: (params) => {
        return params.row.role[0]?.title;
      }
    },
    {
      field: 'Delai',
      headerName: 'Délai',
      width: 50,
      editable: false,
      renderCell: (params) => {
        return params.row.action?.delai + ' jour(s)';
      }
    }
  ];
  const [actionSelect, setActionSelect] = React.useState();
  const [analyse, setAnalyse] = React.useState();
  const structuration = () => {
    let groupe = _.groupBy(data, 'action.title');
    let key = Object.keys(groupe);
    let table = [];
    for (let i = 0; i < key.length; i++) {
      table.push({
        action: key[i],
        // visites: _.filter(groupe['' + key[i]], { shop_name: user.idShop })
        visites: groupe['' + key[i]]
      });
    }
    setAnalyse(table);
  };

  React.useEffect(() => {
    structuration();
  }, [data]);
  const [openListe, setOpenListe] = React.useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  const openFonction = (index) => {
    if (user?.permission.includes(index.visites[0].actionEnCours)) {
      setActionSelect(index);
      if (index.action === 'Renseigner le statut') {
        setOpen(true);
      } else {
        navigate('/event', { state: index.visites });
      }
    } else {
      const audio = new Audio(NofificationAudio);
      audio.play();
      success('you cannot change anything about this action', 'error');
    }
  };
  const functionListe = (index) => {
    const { visites, action } = index;
    navigate('/liste', { state: { visites, action } });
  };
  return (
    <Contexte>
      {contextHolder}
      <Paper
        sx={{
          marginBottom: '20px',
          padding: '10px',
          fontWeight: 'bolder'
        }}
      >
        {analyse && analyse.length === 0 ? <p style={{ textAlign: 'center', color: 'red' }}>No action pending</p> : 'pending actions'}
      </Paper>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        {analyse &&
          analyse.length > 0 &&
          analyse.map((index) => {
            return (
              <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={4} lg={4} key={index.action}>
                <AnalyticEcommerce
                  functionAction={() => openFonction(index)}
                  functionListe={() => functionListe(index)}
                  title={index.action}
                  count={index.visites.length}
                  bg={couleurAll(index)}
                />
              </Grid>
            );
          })}

        {!analyse && <LoaderGif width={200} height={200} />}

        {actionSelect && actionSelect.visites.length > 0 && (
          <>
            <Grid item xs={12} md={12} lg={11.99}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">Customers</Typography>
                </Grid>
                <Grid />
              </Grid>
              <MainCard sx={{ mt: 2 }}>
                {/* <OrdersTable /> */}

                <DataGrid
                  rows={actionSelect.visites}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 20
                      }
                    }
                  }}
                  pageSizeOptions={[20]}
                  disableRowSelectionOnClick
                />
              </MainCard>
            </Grid>
          </>
        )}
        {actionSelect && (
          <Popup open={open} setOpen={setOpen} title="Take action">
            <RenseignerFeedback donner={actionSelect} />
          </Popup>
        )}
        {actionSelect && (
          <Popup open={openListe} setOpen={setOpenListe} title="Take action">
            <Liste client={actionSelect?.visites} />
          </Popup>
        )}
      </Grid>
      {/* <Notification texte="je suis un texte" /> */}
    </Contexte>
  );
};

export default DashboardDefault;
