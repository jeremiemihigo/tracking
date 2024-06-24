import { Fab, Grid, Typography } from '@mui/material';
import { CreateContexteGlobal } from 'GlobalContext';
import { message } from 'antd';
import axios from 'axios';
import LoaderGif from 'components/LoaderGif';
import MainCard from 'components/MainCard';
import _ from 'lodash';
import ActionPending from 'pages/Component/ActionPending';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { config, lien_readclient, sla } from 'static/Lien';
import Popup from 'static/Popup';
import moment from '../../../node_modules/moment/moment';
import OpenResult from './OpenResult';

function AllCustomer() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const user = useSelector((state) => state.user?.user);
  const [dataOpen, setDataOpen] = React.useState();
  const [chargement, setChargement] = React.useState(true);
  const status = useSelector((state) => state.status?.status);
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    if (user && user?.operation !== 'suivi') {
      navigate('/');
    }
  }, [user]);

  function openResu(index) {
    setDataOpen(index);
    setOpen(true);
  }
  const loading = async () => {
    try {
      const link = user.fonctio[0]?.link;
      setChargement(true);
      const response = await axios.get(`${lien_readclient}/${link}`, config);
      setChargement(false);
      document.getElementById('leftContent').textContent = `${response.data.length} customers are waiting`;
      setData(response.data);
    } catch (error) {
      setChargement(false);
      console.log(error);
    }
  };

  const [analyseField, setAnalyseField] = React.useState();
  const [analyseZbm, setAnalyseZbm] = React.useState();
  const [analyseAction, setAnalyseAction] = React.useState();

  const allAnalyse = () => {
    if (user && user.monitoring === 'region') {
      const action = Object.keys(_.groupBy(data, 'status.idStatus'));
      const region = Object.keys(_.groupBy(data, 'shop_region'));
      setAnalyseField({ action, region });
    }
    if (user && user.monitoring === 'shop') {
      const shop = Object.keys(_.groupBy(data, 'shop_name'));
      const action = Object.keys(_.groupBy(data, 'status.idStatus'));
      setAnalyseZbm({ action, shop });
    }
    if (user && user.monitoring === 'status') {
      const action = Object.keys(_.groupBy(data, 'status.idStatus'));
      setAnalyseAction(action);
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

  const rechercheNombre = (lieu, stat, type) => {
    if (type === 'shop') {
      return data.filter((x) => x.statusEnCours === stat && x.shop_name === lieu);
    }
    if (type === 'region') {
      return data.filter((x) => x.statusEnCours === stat && x.shop_region === lieu);
    }
  };
  const retournTotal = (region) => {
    return data.filter((x) => x.shop_region === region);
  };
  const returnAction = (id) => {
    if (status && status.length > 0) {
      return _.filter(status, { idStatus: id })[0]?.title;
    }
  };
  const functionListe = (region, stat, type) => {
    let client = rechercheNombre(region, stat, type);
    navigate('/liste', { state: { visites: client, action: stat } });
  };

  const retournForTeam = (stat) => {
    return data.filter((x) => x.statusEnCours === stat);
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
    const clients = _.filter(data, { statusEnCours: action });
    if (clients.length > 0) {
      navigate('/liste', { state: { visites: clients, action } });
    } else {
      success('no customers for this status', 'error');
    }
  };

  const returnRole = (item) => {
    if (status) {
      let roles = status.filter((x) => x.idStatus === item)[0]?.roles;
      if (roles.length > 0) {
        return status.filter((x) => x.idStatus === item)[0]?.roles[0].title;
      } else {
        return 'maybe a household visit';
      }
    } else {
      return 'maybe a household visit';
    }
  };

  const [dataChange, setDataChange] = React.useState({ content: null, error: '' });
  const { content } = dataChange;
  const { socket } = React.useContext(CreateContexteGlobal);
  React.useEffect(() => {
    socket.on('renseigne', (donner) => {
      if (donner.error === 'success') {
        setDataChange({ content: donner.content[0] });
      }
      // new Notification('Action effectuee');
    });
  }, [socket]);
  React.useEffect(() => {
    function existe() {
      if (_.filter(data, { _id: content._id }).length > 0) {
        let nouvel = data.map((x) => (x._id === content._id ? content : x));
        setData(nouvel);
      } else {
        setData({ ...data, content });
      }
    }
    if (content && data) {
      if (user?.fonctio[0]?.title === 'ZBM' && user?.region.includes(content.shop_region)) {
        existe();
      }
      if (user?.fonctio[0]?.title === 'FIELD') {
        existe();
      }
      if (user?.fonctio[0]?.title === 'RS' && user?.region.includes(content.shop_name)) {
        existe();
      }
      if (user?.fonction?.includes(content.role[0]?.id)) {
        existe();
      }
    }
  }, [content]);
  const returnLastupdate = (action, region) => {
    if (data && data.length > 0) {
      if (region) {
        let donner = _.orderBy(_.filter(data, { statusEnCours: action, shop_region: region }), 'updatedAt', 'asc');
        if (donner.length > 0) {
          return donner[donner.length - 1]['updatedAt'];
        } else {
          return '';
        }
      } else {
        let donner = _.orderBy(_.filter(data, { statusEnCours: action }), 'updatedAt', 'asc');
        if (donner.length > 0) {
          return donner[donner.length - 1]['updatedAt'];
        } else {
          return '';
        }
      }
    } else {
      return '';
    }
  };

  const affichageZbm = (client, region) => {
    navigate('/region_monitoring', { state: { data: client, region } });
  };
  const today = useSelector((state) => state.today?.today);
  const returnSLANumber = (data, type) => {
    let nombre = 0;
    for (let i = 0; i < data.length; i++) {
      if (
        sla({ delaiPrevu: data[i].status.sla, dateFin: today?.unixtime || new Date().getTime(), dateDebut: data[i].updatedAt }) === type
      ) {
        nombre = nombre + 1;
      }
    }
    return nombre;
  };
  const returnCOlor = (id) => {
    if (status && status.length > 0) {
      let a = _.filter(status, { idStatus: id })[0];
      return a.roles[0]?.color || '#fff';
    }
  };
  return (
    <div>
      {contextHolder}
      <MainCard title="">
        {chargement && !data && <LoaderGif width={300} height={300} />}
        <Grid container>
          {analyseField &&
            user &&
            user.monitoring === 'region' &&
            analyseField?.region.map((index, key) => {
              return (
                <Grid item key={key} lg={2} xs={12} sm={12} md={6}>
                  <Grid
                    onClick={() => affichageZbm(retournTotal(index), index)}
                    sx={{
                      padding: '5px',
                      cursor: 'pointer',
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
                            md={6}
                            xs={6}
                            sm={4}
                            key={action}
                            sx={{ padding: '2px', cursor: 'pointer' }}
                            onClick={() => functionListe(index, action, 'region')}
                          >
                            <ActionPending
                              action={returnAction(action)}
                              role={returnRole(action)}
                              nombre={rechercheNombre(index, action, 'region').length}
                              outsla={returnSLANumber(rechercheNombre(index, action, 'region'), 'OUTSLA')}
                              insla={returnSLANumber(rechercheNombre(index, action, 'region'), 'INSLA')}
                              lastupdate={returnLastupdate(action, index) !== '' && moment(returnLastupdate(action, index)).fromNow()}
                              bg={returnCOlor(action)}
                            />
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
            user?.monitoring === 'shop' &&
            analyseZbm.shop.map((shop, key) => {
              return (
                <Grid item key={key} lg={3} xs={12} sm={6} md={6} sx={{ paddingLeft: '1px' }}>
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
                            xs={6}
                            sm={12}
                            key={action}
                            sx={{ padding: '2px', cursor: 'pointer' }}
                            onClick={() => functionListe(shop, action, 'shop')}
                          >
                            <ActionPending
                              action={returnAction(action)}
                              role={returnRole(action)}
                              nombre={rechercheNombre(shop, action, 'shop').length}
                              outsla={returnSLANumber(rechercheNombre(shop, action, 'shop'), 'OUTSLA')}
                              insla={returnSLANumber(rechercheNombre(shop, action, 'shop'), 'INSLA')}
                              lastupdate={returnLastupdate(action) !== '' && moment(returnLastupdate(action)).fromNow()}
                              bg={returnCOlor(action)}
                            />
                          </Grid>
                        )
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
        {user && user.monitoring === 'status' && <Grid container></Grid>}

        {user && user.monitoring === 'status' && analyseAction && (
          <Grid container>
            {analyseAction.map((index) => {
              return (
                <Grid
                  item
                  lg={3}
                  md={6}
                  xs={6}
                  sm={4}
                  key={index}
                  sx={{ padding: '2px', cursor: 'pointer' }}
                  onClick={() => navigationManagment(index)}
                >
                  <ActionPending
                    action={returnAction(index)}
                    role={returnRole(index)}
                    nombre={retournForTeam(index).length}
                    outsla={returnSLANumber(retournForTeam(index), 'OUTSLA')}
                    insla={returnSLANumber(retournForTeam(index), 'INSLA')}
                    lastupdate={returnLastupdate(index) !== '' && moment(returnLastupdate(index)).fromNow()}
                    bg="#fff"
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
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
