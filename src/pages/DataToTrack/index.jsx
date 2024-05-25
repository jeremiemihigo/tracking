import { Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ConfirmDialog from 'components/ConfirmDialog';
import ExcelButton from 'components/Excel';
import LoaderGif from 'components/LoaderGif';
import MainCard from 'components/MainCard';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { allpermissions, differenceDays } from 'static/Lien';
import AddData from './AddData';
import './style.css';

function Index() {
  const dataTotrack_state = useSelector((state) => state.data_to_track);
  const [liste, setListe] = React.useState();
  const agent = useSelector((state) => state.agent?.agent);
  const user = useSelector((state) => state.user?.user);

  const laodingAgent = (codeAgent) => {
    if (agent && agent.length > 0 && _.filter(agent, { codeAgent: codeAgent }).length > 0) {
      return _.filter(agent, { codeAgent: codeAgent })[0].nom;
    } else {
      return '';
    }
  };
  const loadingSla = (index) => {
    return index.delaiPrevu - differenceDays(index.dateFin, index.dateDebut);
  };

  const retournSla = (data) => {
    if (data.client.length > 0 && data.client[0].result.length > 0) {
      return loadingSla(data.client[0].result[data.client[0].result.length - 1]) >= 0 ? 'INSLA' : 'OUTSLA';
    } else {
      return '';
    }
  };
  const returnLastStatus = (data) => {
    if (data.client.length === 0) {
      return 'it is not yet in the tracker clients';
    }
    if (data.client[0]?.result.length === 0) {
      return 'waiting for action';
    }
    if (data.client[0]?.result.length > 0) {
      return data.client[0].result[data.client[0].result.length - 1]['action'];
    }
  };
  const returInCharge = (data) => {
    if (data.client[0]?.result.length > 0) {
      return laodingAgent(data.client[0].result[data.client[0].result.length - 1]['codeAgent']);
    } else {
      return '';
    }
  };

  const columns = [
    {
      field: 'unique_account_id',
      headerName: 'code client',
      width: 115,
      editable: false
    },
    {
      field: 'customer_name',
      headerName: 'NOMS',
      width: 150,
      editable: false
    },
    {
      field: 'shop',
      headerName: 'Shop',
      width: 80,
      editable: false
    },
    {
      field: 'region',
      headerName: 'Region',
      width: 80,
      editable: false
    },
    {
      field: 'person_in_charge',
      headerName: 'in charge',
      width: 50,
      editable: false
    },
    {
      field: 'last_status',
      headerName: 'status',
      width: 80,
      editable: false
    },
    {
      field: 'par',
      headerName: 'PAR',
      width: 80,
      editable: false
    },
    {
      field: 'Last_action',
      headerName: 'Last action',
      width: 150,
      editable: false
    },
    {
      field: 'In_charge',
      headerName: 'In charge',
      width: 100,
      editable: false
    },
    {
      field: 'sla',
      headerName: 'SLA',
      width: 80,
      editable: false
    }
  ];

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });

  const generatePdf = () => {
    let table = [];
    for (let i = 0; i < dataTotrack_state.datatotrack.length; i++) {
      table.push({
        unique_account_id: dataTotrack_state.datatotrack[i].unique_account_id,
        customer_name: dataTotrack_state.datatotrack[i].customer_name,
        region: dataTotrack_state.datatotrack[i].region,
        shop: dataTotrack_state.datatotrack[i].shop,
        par: dataTotrack_state.datatotrack[i].par,
        last_status: dataTotrack_state.datatotrack[i].last_status,
        person_in_charge: dataTotrack_state.datatotrack[i].person_in_charge,
        month: dataTotrack_state.datatotrack[i].month,
        sla: retournSla(dataTotrack_state.datatotrack[i]),
        Last_action: returnLastStatus(dataTotrack_state.datatotrack[i]),
        In_charge: returInCharge(dataTotrack_state.datatotrack[i]),
        id: dataTotrack_state.datatotrack[i]._id
      });
    }
    setListe(table);
  };
  React.useEffect(() => {
    if (dataTotrack_state?.datatotrack.length > 0) {
      generatePdf();
    }
  }, [dataTotrack_state]);

  return (
    <>
      <Paper sx={{ padding: '5px', marginBottom: '10px' }}>
        {liste && liste.length > 0 ? (
          <ExcelButton data={liste} title="" fileName={`Data to track ${liste[0].month}`} sheetName={liste[0].month} />
        ) : (
          <p style={{ padding: '0px', margin: '0px' }}>Loading...</p>
        )}
      </Paper>
      <MainCard>
        <Grid container>
          <Grid item lg={12}>
            {!liste && <LoaderGif width={200} height={200} />}
            {dataTotrack_state.readdatatotrack === 'success' && liste && liste.length > 0 && (
              <div style={{ width: '100%' }}>
                <DataGrid
                  rows={liste}
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
              </div>
            )}
          </Grid>
          {allpermissions(user?.role) && <AddData />}
        </Grid>
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      </MainCard>
    </>
  );
}
export default Index;
