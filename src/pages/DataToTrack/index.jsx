import { Add } from '@mui/icons-material';
import { Fab, Grid, Paper, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ConfirmDialog from 'components/ConfirmDialog';
import ExcelButton from 'components/Excel';
import LoaderGif from 'components/LoaderGif';
import React from 'react';
import { useSelector } from 'react-redux';
import { sla } from 'static/Lien';
import Popup from 'static/Popup';
import Addclient from './Addclient';
import './style.css';

function Index({ clients }) {
  const dataTotrack = useSelector((state) => state.data_to_track);
  const [open, setOpen] = React.useState(false);
  const [liste, setListe] = React.useState();
  const now = useSelector((state) => state.today?.today);
  const dataTotrack_state = clients ? { datatotrack: clients } : { datatotrack: dataTotrack?.datatotrack };
  const columns = [
    {
      field: 'unique_account_id',
      headerName: 'code client',
      width: 120,
      editable: false
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false
    },

    {
      field: 'shop',
      headerName: 'Shop',
      width: 100,
      editable: false
    },
    {
      field: 'region',
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
      field: 'laststatus',
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
      field: 'nextstatus',
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
              fontSize: '10px',
              padding: '3px',
              borderRadius: '5px',
              color: 'white',
              width: '100%',
              textAlign: 'center',
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

  const generatePdf = () => {
    if (dataTotrack_state && dataTotrack.datatotrack.length > 0) {
      let table = [];
      for (let i = 0; i < dataTotrack_state.datatotrack.length; i++) {
        table.push({
          id: i,
          unique_account_id: dataTotrack_state.datatotrack[i].unique_account_id,
          name: dataTotrack_state.datatotrack[i].customer_name,
          shop: dataTotrack_state.datatotrack[i].shop_name,
          region: dataTotrack_state.datatotrack[i].shop_region,
          nextstatus: dataTotrack_state.datatotrack[i].status.title,
          laststatus: returnLastStatus(dataTotrack_state.datatotrack[i].result, 'status'),
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
    }
  };
  React.useEffect(() => {
    if (dataTotrack_state?.datatotrack.length > 0) {
      generatePdf();
    }
  }, [dataTotrack_state]);
  const user = useSelector((state) => state.user?.user);

  return (
    <>
      <Paper sx={{ padding: '5px', marginBottom: '10px', display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>
          {liste && liste.length > 0 ? (
            <ExcelButton
              data={liste}
              title=""
              fileName={clients ? liste[0].nextstatus : `Data to track ${liste[0].month}`}
              sheetName={liste[0].month}
            />
          ) : (
            <p style={{ padding: '0px', margin: '0px' }}>Loading...</p>
          )}
        </div>
        {user?.role === 'M5LGJHU8' && (
          <Tooltip title="Ajoutez un client">
            <Fab size="small" color="primary" onClick={() => setOpen(true)}>
              <Add fontSize="small" />
            </Fab>
          </Tooltip>
        )}
      </Paper>

      <Grid container>
        <Grid item lg={12}>
          {!liste && <LoaderGif width={200} height={200} />}
          {liste && liste.length > 0 && (
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={liste}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 30
                    }
                  }
                }}
                pageSizeOptions={[30]}
                disableRowSelectionOnClick
              />
            </div>
          )}
        </Grid>
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Ajoutez un client">
        <Addclient />
      </Popup>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
}
export default Index;
