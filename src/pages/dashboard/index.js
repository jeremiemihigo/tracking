import DangerousSharpIcon from '@mui/icons-material/DangerousSharp';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import StartIcon from '@mui/icons-material/Start';
import { Fab, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { message } from 'antd';
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
import { config, lien_read, sla } from 'static/Lien';
import axios from '../../../node_modules/axios/index';
import TakeAction from './TakeAction';
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
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  const allaction = useSelector((state) => state?.action.action);
  const user = useSelector((state) => state.user?.user);
  const [dataChange, setDataChange] = React.useState();

  const handleNext = (dataStep) => {
    setDataChange(dataStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 5
    });
  };
  const columns = [
    {
      field: 'unique_account_id',
      headerName: 'code client',
      width: 120,
      editable: false
    },
    {
      field: 'nomclient',
      headerName: 'Name',
      width: 170,
      editable: false
    },

    {
      field: 'shop_name',
      headerName: 'Shop',
      width: 120,
      editable: false
    },
    {
      field: 'shop_region',
      headerName: 'Region',
      width: 100,
      editable: false
    },
    {
      field: 'par',
      headerName: 'PAR',
      width: 70,
      editable: false
    },

    {
      field: 'actionTitle',
      headerName: 'Action',
      width: 180,
      editable: false
    },
    {
      field: 'sla',
      headerName: 'SLA',
      width: 80,
      editable: false,
      renderCell: (params) => {
        return (
          <p
            style={{
              fontSize: '10px',
              padding: '3px',
              borderRadius: '5px',
              color: 'white',
              margin: '0px',
              backgroundColor: `${params.row.sla === 'OUTSLA' ? 'red' : 'green'}`
            }}
          >
            {params.row.sla}
          </p>
        );
      }
    },
    {
      field: 'takeAction',
      headerName: 'Option',
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {user && user.permission.includes(params.row.actionEnCours) ? (
              <Fab size="small" onClick={() => handleNext(params.row)} color="primary">
                <StartIcon fontSize="small" />
              </Fab>
            ) : (
              <Fab color="secondary" size="small" onClick={() => success('you are not authorized to take action on this client', 'error')}>
                <DangerousSharpIcon fontSize="small" />
              </Fab>
            )}
          </>
        );
      }
    }
  ];

  const [data, setData] = React.useState();
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
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
  const [analyse, setAnalyse] = React.useState([]);
  const structuration = () => {
    if (data && data.length > 0) {
      let groupe = _.groupBy(data, 'action.idAction');
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
  const returnAction = (id) => {
    if (allaction && allaction.length > 0) {
      return _.filter(allaction, { idAction: id })[0]?.title;
    }
  };
  const now = useSelector((state) => state.today?.today);
  const couleurAll = (allData) => {
    let nombreIn = 0;
    let nombreOut = 0;
    let today = 0;
    for (let i = 0; i < allData.visites.length; i++) {
      if (
        sla({ delaiPrevu: allData.visites[i].action.delai, dateFin: now?.datetime, dateDebut: allData.visites[i].updatedAt }) === 'INSLA'
      ) {
        nombreIn = nombreIn + 1;
      } else {
        nombreOut = nombreOut + 1;
      }
    }
    return { today, nombreIn, nombreOut };
  };
  const [dataStructure, setDataStructure] = React.useState();
  const structreData = () => {
    if (data && data.length > 0) {
      let tables = [];
      for (let i = 0; i < data.length; i++) {
        tables.push({
          ...data[i],
          nomclient: data[i].client[0]?.customer_name,
          par: data[i].client[0]?.par,
          sla: sla({ delaiPrevu: data[i].action.delai, dateFin: now?.datetime, dateDebut: data[i].updatedAt })
        });
      }
      setDataStructure(tables);
    }
  };
  React.useEffect(() => {
    structreData();
  }, [data]);

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
      if (user.permission.includes(datasubmit.content[0].actionEnCours)) {
        let exite = _.filter(data, { _id: datasubmit.content[0]._id });
        if (exite.length > 0) {
          const content = datasubmit.content[0];
          let normal = data.map((x) => (x._id === datasubmit.content[0]._id ? content : x));
          setData(normal);
          structreData();
        } else {
          let d = data;
          d.push(datasubmit.content[0]);
          setData(d);
          structreData();
        }
      } else {
        let normal = data.filter((x) => x._id !== datasubmit.content[0]._id);
        setData(normal);
        structreData();
      }
    }
  }, [datasubmit]);
  const productTemplate = (index) => {
    return (
      <div style={{ width: '95%', margin: '5px' }}>
        <AnalyticEcommerce title={returnAction(index.action)} count={index.visites.length} bg={couleurAll(index)} />{' '}
      </div>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {contextHolder}
      {!data && <LoaderGif width={100} height={100} />}
      {data && data.length > 0 && (
        <>
          <Grid className="itemes">
            {analyse.length > 0 && (
              <Carousel
                value={analyse}
                numVisible={4}
                numScroll={1}
                responsiveOptions={responsiveOptions}
                className="custom-carousel"
                circular
                autoplayInterval={10000}
                itemTemplate={productTemplate}
              />
            )}
          </Grid>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
          <Grid>
            {steps[activeStep].id === 1 && dataStructure && (
              <DataGrid
                rows={dataStructure}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 6
                    }
                  }
                }}
                pageSizeOptions={[6]}
                disableRowSelectionOnClick
              />
            )}
            {steps[activeStep].id === 2 && dataChange && <TakeAction data={dataChange} step={handleBack} />}
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
