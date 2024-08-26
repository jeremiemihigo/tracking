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
import ExcelButton from 'components/Excel';
import LoaderGif from 'components/LoaderGif';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { sla } from 'static/Lien';
import { CreateContextDashboard } from './Context';
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
      width: 100,
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
      width: 80,
      editable: false
    },
    {
      field: 'par_to_date',
      headerName: 'PAR',
      width: 70,
      editable: false
    },
    {
      field: 'lastStatusDetail',
      headerName: 'Last status',
      width: 180,
      editable: false
    },
    {
      field: 'lastAgent',
      headerName: 'Last agent',
      width: 100,
      editable: false
    },

    {
      field: 'statusTitle',
      headerName: 'Next Status',
      width: 180,
      editable: false
    },

    {
      field: 'sla',
      headerName: 'SLA',
      width: 70,
      editable: false,
      renderCell: (params) => {
        return (
          <p
            style={{
              fontSize: '9px',
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
      width: 80,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {user && user.fonction?.includes(params.row.role[0].id) ? (
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
  const { data } = React.useContext(CreateContextDashboard);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const now = useSelector((state) => state.today?.today);
  const returnLastStatus = (row, title) => {
    if (row.result.length > 0) {
      return row.result[row.result.length - 1]['' + title];
    } else {
      return row?.statusTitle;
    }
  };
  const [dataStructure, setDataStructure] = React.useState();
  const structreData = () => {
    if (data && data.length > 0) {
      let tables = [];
      for (let i = 0; i < data.length; i++) {
        tables.push({
          ...data[i],
          lastStatusDetail: returnLastStatus(data[i], 'status'),
          lastAgent: returnLastStatus(data[i], 'codeAgent'),
          sla: sla({ delaiPrevu: data[i].status.sla, dateFin: now?.datetime || new Date(), dateDebut: data[i].updatedAt })
        });
      }
      setDataStructure(tables);
    }
  };
  React.useEffect(() => {
    structreData();
  }, [data]);
  const [excel, setExcel] = React.useState();
  const ExportToExcel = () => {
    try {
      if (dataStructure) {
        const table = [];
        for (let i = 0; i < dataStructure.length; i++) {
          table.push({
            unique_account_id: dataStructure[i].unique_account_id,
            customer_name: dataStructure[i].customer_name,
            lastAgent: dataStructure[i].lastAgent,
            'Last status': dataStructure[i].lastStatusDetail,
            par_to_date: dataStructure[i].par_to_date,
            'ID VISITE': dataStructure[i]?.objectVisite?.idDemande,
            'VISITED BY': dataStructure[i]?.objectVisite?.codeAgent,
            'FEEDBACK VISIT': dataStructure[i]?.objectVisite?.raison,
            shop_name: dataStructure[i].shop_name,
            shop_region: dataStructure[i].shop_region,
            sla: dataStructure[i].sla,
            Status: dataStructure[i].statusTitle
          });
        }
        setExcel(table);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    ExportToExcel();
  }, [dataStructure]);
  return (
    <Box>
      {excel && excel.length > 0 && steps[activeStep].id === 1 && <ExcelButton data={excel} fileName="tracking" sheetName="Clients" />}

      {contextHolder}
      {!data && <LoaderGif width={300} height={300} />}
      {data && data.length === 0 && <p>Aucun client en attente chez vous</p>}
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
                      pageSize: 25
                    }
                  }
                }}
                pageSizeOptions={[25]}
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
