import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Images from 'assets/images/icons/attente.png';
import LoaderGif from 'components/LoaderGif';
import _ from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.css';
import AnalyticEcommerce from 'components/AnalyticEcommerce';
import { differenceDays, sla } from 'static/Lien';
import { Paper } from '../../../node_modules/@mui/material/index';
import { CreateContextDashboard } from './Context';
import DetailAction from './DetailAction';
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

  const [selectedAction, setSelected] = React.useState();
  const [show, setShow] = React.useState(false);

  const funct = (info) => {
    setSelected(info);
    setShow(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {!data && <LoaderGif width={300} height={300} />}
      {data && data.length > 0 && (
        <>
          <Grid container>
            {analyse.length > 0 &&
              analyse.map((index, key) => {
                return (
                  <Grid key={key} item lg={4} xs={12} sm={6} md={4}>
                    <div style={{ margin: '3px' }}>
                      <AnalyticEcommerce
                        title={returnAction(index.action)}
                        data={index.action}
                        count={index.visites.length}
                        bg={couleurAll(index)}
                      />
                      <Paper
                        style={{ color: '#052c65', cursor: 'pointer', padding: '0px 10px', fontSize: '12px', textAlign: 'right' }}
                        onClick={() => funct(index.action)}
                      >
                        show more details
                      </Paper>
                    </div>
                  </Grid>
                );
              })}
          </Grid>
          <DetailAction data={selectedAction} show={show} setShow={setShow} />
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
