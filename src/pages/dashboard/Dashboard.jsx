import { SearchOutlined } from '@ant-design/icons';
import { FormControl, Grid, InputAdornment, OutlinedInput, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Images from 'assets/images/icons/attente.png';
import AnalyticEcommerce from 'components/AnalyticEcommerce';
import _ from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { differenceDays, sla } from 'static/Lien';
import { CreateContextDashboard } from './Context';
import ShowDetails from './ShowDetail';
import './style.css';

function TextMobileStepper() {
  const { data, analyse } = React.useContext(CreateContextDashboard);
  const status = useSelector((state) => state.status?.status);
  const returnAction = (id) => {
    if (status && status.length > 0) {
      return _.filter(status, { idStatus: id })[0]?.title;
    }
  };
  const now = useSelector((state) => state.today?.today);
  const couleurAll = (allData) => {
    let nombreIn = 0;
    let nombreOut = 0;
    let today = 0;
    for (let i = 0; i < allData.visites.length; i++) {
      if (differenceDays(now?.datetime || new Date(), allData.visites[i].updatedAt) === allData.visites[i].status.sla) {
        today = today + 1;
        nombreIn = nombreIn + 1;
      } else {
        if (
          sla({
            delaiPrevu: allData.visites[i].status.sla,
            dateFin: now?.datetime || new Date(),
            dateDebut: allData.visites[i].updatedAt
          }) === 'INSLA'
        ) {
          nombreIn = nombreIn + 1;
        } else {
          nombreOut = nombreOut + 1;
        }
      }
    }
    return { today, nombreIn, nombreOut };
  };
  const [filterFn, setFilterFn] = React.useState({
    fn: (items) => {
      return items;
    }
  });
  const handleChanges = (e) => {
    let target = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (target === '') {
          return items;
        } else {
          return items.filter(
            (x) =>
              x.visites[0]?.statusTitle.toUpperCase().includes(target.toUpperCase()) ||
              x.visites[0]?.role[0]?.title.toUpperCase().includes(target.toUpperCase())
          );
        }
      }
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ marginBottom: '10px' }}>
        <FormControl sx={{ width: '100%' }}>
          <OutlinedInput
            size="small"
            id="header-search"
            startAdornment={
              <InputAdornment position="start" sx={{ mr: -0.5 }}>
                <SearchOutlined />
              </InputAdornment>
            }
            aria-describedby="header-search-text"
            inputProps={{
              'aria-label': 'weight'
            }}
            onChange={(e) => handleChanges(e)}
            placeholder="Research status"
          />
        </FormControl>
      </div>
      {data && data.length > 0 && (
        <>
          <Grid container>
            {analyse.length > 0 &&
              filterFn.fn(analyse).map((index, key) => {
                return (
                  <Grid key={key} item lg={3} xs={12} sm={6} md={4}>
                    <div style={{ margin: '3px' }}>
                      <AnalyticEcommerce
                        title={returnAction(index.action)}
                        data={index.action}
                        count={index?.visites}
                        bg={couleurAll(index)}
                      />
                      <Paper
                        style={{ color: '#052c65', cursor: 'pointer', padding: '0px 10px', fontSize: '12px', textAlign: 'right' }}
                        color="secondary"
                      >
                        <ShowDetails idStatus={index.action} />
                      </Paper>
                    </div>
                  </Grid>
                );
              })}
          </Grid>
        </>
      )}
      {data && data.length === 0 && (
        <div className="attente">
          <div>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
              <img src={Images} alt="info-attente" />
            </div>
            <p>No action pending at your location</p>
          </div>
        </div>
      )}
    </Box>
  );
}
export default TextMobileStepper;
