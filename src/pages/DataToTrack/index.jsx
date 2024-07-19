import { Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ConfirmDialog from 'components/ConfirmDialog';
import ExcelButton from 'components/Excel';
import LoaderGif from 'components/LoaderGif';
import MainCard from 'components/MainCard';
import React from 'react';
import { useSelector } from 'react-redux';
import { sla } from 'static/Lien';
import './style.css';

function Index() {
  const dataTotrack_state = useSelector((state) => state.data_to_track);
  const [liste, setListe] = React.useState();
  const now = useSelector((state) => state.today?.today);

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
      width: 80,
      editable: false
    },
    {
      field: 'par',
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
    }
  ];

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });

  const returnLastStatus = (row, title) => {
    if (row.length > 0) {
      return row[row.length - 1]['' + title];
    } else {
      return row;
    }
  };
  console.log(dataTotrack_state);
  const generatePdf = () => {
    let table = [];
    for (let i = 0; i < dataTotrack_state.datatotrack.length; i++) {
      table.push({
        ...dataTotrack_state.datatotrack[i],
        id: i,
        nomclient: dataTotrack_state.datatotrack[i].customer_name,
        statusTitle: dataTotrack_state.datatotrack[i].status.title,
        lastStatusDetail: returnLastStatus(dataTotrack_state.datatotrack[i].result, 'status'),
        lastAgent: returnLastStatus(dataTotrack_state.datatotrack[i].result, 'codeAgent'),
        par: dataTotrack_state.datatotrack[i].par_to_date,
        sla: sla({
          delaiPrevu: dataTotrack_state.datatotrack[i].status.sla,
          dateFin: now?.datetime || new Date(),
          dateDebut: dataTotrack_state.datatotrack[i].updatedAt
        })
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
        </Grid>
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      </MainCard>
    </>
  );
}
export default Index;
