import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Images from 'assets/images/icons/attente.png';
import LoaderGif from 'components/LoaderGif';
import _ from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.css';
import { CreateContexteGlobal } from 'GlobalContext';
import AnalyticEcommerce from 'components/AnalyticEcommerce';
import { Carousel } from 'primereact/carousel';
import { config, lien_readclient, sla } from 'static/Lien';
import axios from '../../../node_modules/axios/index';
import './style.css';

const steps = [
  {
    id: 1
  },
  {
    id: 2
  }
];

function TextMobileStepper() {
  const user = useSelector((state) => state.user?.user);

  const [data, setData] = React.useState();

  const loadingClient = async () => {
    try {
      const link = user.fonctio[0]?.link;

      const response = await axios.get(`${lien_readclient}/${link}`, config);
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
  const [analyse, setAnalyse] = React.useState([]);
  const structuration = () => {
    if (data && data.length > 0) {
      let groupe = _.groupBy(data, 'status.idStatus');
      let key = Object.keys(groupe);
      let table = [];
      for (let i = 0; i < key.length; i++) {
        table.push({
          action: key[i],
          visites: groupe['' + key[i]]
        });
      }
      setAnalyse(table);
    }
  };
  React.useEffect(() => {
    structuration();
  }, [data]);
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
      if (sla({ delaiPrevu: allData.visites[i].status.sla, dateFin: now?.datetime, dateDebut: allData.visites[i].updatedAt }) === 'INSLA') {
        nombreIn = nombreIn + 1;
      } else {
        nombreOut = nombreOut + 1;
      }
    }
    return { today, nombreIn, nombreOut };
  };

  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const [datasubmit, setDataSubmit] = React.useState();
  const { socket } = React.useContext(CreateContexteGlobal);
  React.useEffect(() => {
    socket.on('renseigne', (donner) => {
      setDataSubmit(donner);
    });
  }, [socket]);
  React.useEffect(() => {
    if (datasubmit && datasubmit.error === 'success') {
      if (user.mystatus.includes(datasubmit.content[0].statusEnCours)) {
        let exite = _.filter(data, { _id: datasubmit.content[0]._id });
        if (exite.length > 0) {
          const content = datasubmit.content[0];
          let normal = data.map((x) => (x._id === datasubmit.content[0]._id ? content : x));
          setData(normal);
        } else {
          let d = data;
          d.push(datasubmit.content[0]);
          setData(d);
          structuration();
        }
      } else {
        let normal = data.filter((x) => x._id !== datasubmit.content[0]._id);
        setData(normal);
        structuration();
      }
    }
  }, [datasubmit]);
  const productTemplate = (index) => {
    return (
      <div style={{ width: '95%', margin: '5px' }}>
        <AnalyticEcommerce title={returnAction(index.action)} data={index.action} count={index.visites.length} bg={couleurAll(index)} />{' '}
      </div>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {!data && <LoaderGif width={300} height={300} />}
      {data && data.length > 0 && (
        <>
          <Grid className="itemes">
            {analyse.length > 0 && (
              <Carousel
                value={analyse}
                numVisible={3}
                numScroll={1}
                responsiveOptions={responsiveOptions}
                className="custom-carousel"
                circular
                autoplayInterval={10000}
                itemTemplate={productTemplate}
              />
            )}
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
