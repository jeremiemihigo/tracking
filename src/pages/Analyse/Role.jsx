import { Button, Grid } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import AutoComplement from 'components/AutoComplete';
import LoaderGif from 'components/LoaderGif';
import MainCard from 'components/MainCard';
import NoCustomer from 'components/NoCustomer';
import _ from 'lodash';
import moment from 'moment';
import ActionPending from 'pages/Component/ActionPending';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { config, lien_readclient, sla } from 'static/Lien';

function AllCustomer() {
  const [data, setData] = React.useState();
  const status = useSelector((state) => state.status?.status);
  const [chargement, setChargement] = React.useState(false);
  const navigate = useNavigate();

  const role = useSelector((state) => state.role?.role);
  const [roleSelect, setRoleSelect] = React.useState('');
  const [analyseAction, setAnalyseAction] = React.useState();

  const loading = async () => {
    try {
      setData();
      setChargement(true);
      const response = await axios.get(`${lien_readclient}/departmentOne/${roleSelect?.id}`, config);
      setData(response.data);
      const action = Object.keys(_.groupBy(response.data, 'status.idStatus'));
      setAnalyseAction(action);
      setChargement(false);
    } catch (error) {
      console.log(error);
      setChargement(false);
    }
  };
  const returnAction = (id) => {
    if (status && status.length > 0) {
      return _.filter(status, { idStatus: id })[0]?.title;
    }
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
  return (
    <div>
      <Grid container sx={{ marginBottom: '10px' }}>
        <Grid item lg={10} md={8} xs={10} sm={10}>
          {role && <AutoComplement value={roleSelect} setValue={setRoleSelect} options={role} title="Role" propr="title" />}
        </Grid>
        <Grid item lg={2} md={4} xs={2} sm={2} sx={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
          <Button disabled={chargement} variant="contained" color="primary" onClick={() => loading()}>
            Recherche
          </Button>
        </Grid>
      </Grid>
      {chargement && !data && <LoaderGif width={300} height={300} />}
      {data && data.length === 0 && <NoCustomer texte="No customers waiting on their dashboard" />}
      {contextHolder}
      {data && data.length > 0 && (
        <MainCard title="">
          {analyseAction && (
            <Grid container>
              {analyseAction.map((index) => {
                return (
                  <Grid
                    item
                    lg={3}
                    md={6}
                    xs={12}
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
      )}
    </div>
  );
}

export default AllCustomer;
