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
import { CreateContexteGlobal } from 'GlobalContext';
import { message } from 'antd';
import Images from 'assets/images/icons/attente.png';
import LoaderGif from 'components/LoaderGif';
import _ from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { config, lien_readclient, sla } from 'static/Lien';
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
      field: 'customer_name',
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
      field: 'statusTitle',
      headerName: 'Status',
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
            {(user && user.mystatus.includes(params.row.statusEnCours)) || user.fonction.includes(params.row.statusEnCours) ? (
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

  const now = useSelector((state) => state.today?.today);

  const [dataStructure, setDataStructure] = React.useState();
  const structreData = () => {
    if (data && data.length > 0) {
      let tables = [];
      for (let i = 0; i < data.length; i++) {
        tables.push({
          ...data[i],
          nomclient: data[i].client[0]?.customer_name,
          par: data[i].client[0]?.par,
          sla: sla({ delaiPrevu: data[i].status.sla, dateFin: now?.datetime, dateDebut: data[i].updatedAt })
        });
      }
      setDataStructure(tables);
    }
  };
  React.useEffect(() => {
    structreData();
  }, [data]);

  const [datasubmit, setDataSubmit] = React.useState();
  const { socket } = React.useContext(CreateContexteGlobal);
  React.useEffect(() => {
    socket.on('renseigne', (donner) => {
      setDataSubmit(donner);
    });
  }, [socket]);
  React.useEffect(() => {
    if (datasubmit && datasubmit.error === 'success') {
      if (user && user.fonction.includes(datasubmit.content[0].statusEnCours)) {
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      {contextHolder}
      {!data && <LoaderGif width={300} height={300} />}
      {data && data.length > 0 && (
        <>
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
            {steps[activeStep].id === 2 && dataChange && <TakeAction data={dataChange} step={setActiveStep} />}
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
