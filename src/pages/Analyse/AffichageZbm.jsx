import { Grid, Paper, Typography } from '@mui/material';
import { CreateContexteGlobal } from 'GlobalContext';
import _ from 'lodash';
import PaperHead from 'pages/Component/PaperHead';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import moment from '../../../node_modules/moment/moment';

function AllCustomer() {
  const location = useLocation();
  const { handleLogout } = React.useContext(CreateContexteGlobal);
  console.log(location.state?.region === undefined);
  React.useEffect(() => {
    if (!location.state?.region) {
      handleLogout();
    }
  }, []);

  const data = location.state?.data;
  const region = location.state?.region;

  const [analyseZbm, setAnalyseZbm] = React.useState();
  const allAnalyse = () => {
    const shop = Object.keys(_.groupBy(data, 'shop_name'));
    const action = Object.keys(_.groupBy(data, 'action.idAction'));
    setAnalyseZbm({ action, shop });
  };
  React.useEffect(() => {
    if (data) {
      allAnalyse();
    } else {
      handleLogout();
    }
  }, [data]);

  const rechercheNombre = (lieu, action, type) => {
    if (type === 'shop') {
      return data.filter((x) => x.actionEnCours === action && x.shop_name === lieu);
    }
    if (type === 'region') {
      return data.filter((x) => x.actionEnCours === action && x.shop_region === lieu);
    }
  };
  const action = useSelector((state) => state.action?.action);
  const returnAction = (id) => {
    if (action && action.length > 0) {
      return _.filter(action, { idAction: id })[0]?.title;
    }
  };
  const returnRole = (item) => {
    if (action) {
      let roles = action.filter((x) => x.idAction === item)[0]?.roles;
      if (roles.length > 0) {
        return action.filter((x) => x.idAction === item)[0]?.roles[0].title;
      } else {
        return 'maybe a household visit';
      }
    } else {
      return 'maybe a household visit';
    }
  };
  const returnLastupdate = (action) => {
    if (data && data.length > 0) {
      let donner = _.filter(data, { actionEnCours: action });

      return donner[donner.length - 1]['updatedAt'];
    } else {
      return '';
    }
  };
  const returnCOlor = (id) => {
    if (action && action.length > 0) {
      let a = _.filter(action, { idAction: id })[0];
      return a.color ? a.color : '#fff';
    }
  };

  return (
    <div>
      <PaperHead texte={region} />
      <Grid container>
        {analyseZbm &&
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
                        <Grid item lg={12} md={6} xs={6} sm={12} key={action} sx={{ padding: '2px' }}>
                          <Paper elevation={2} sx={{ padding: '5px', backgroundColor: returnCOlor(action) }}>
                            <p style={{ fontSize: '11px', textAlign: 'center' }}>{returnAction(action)}</p>
                            <Typography component="p" sx={{ fontSize: '9px', textAlign: 'center', padding: '0px', margin: '0px' }}>
                              {returnRole(action)}
                            </Typography>
                            <p style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}>
                              {rechercheNombre(shop, action, 'shop').length}
                            </p>
                            <p style={{ fontSize: '9px', textAlign: 'right' }}>
                              {returnLastupdate(action) !== '' && moment(returnLastupdate(action)).fromNow()}
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
    </div>
  );
}
export default AllCustomer;
