import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import { Paper, Tooltip } from '@mui/material';
import MainCard from 'components/MainCard';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function ListeClient() {
  const location = useLocation();
  const { state } = location;
  console.log(state);

  const columns = [
    {
      field: 'unique_account_id',
      headerName: 'code client',
      width: 120,
      editable: false
    },
    {
      field: 'customer_name',
      headerName: 'NOMS',
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
      width: 100,
      editable: false
    },
    {
      field: 'payment_status',
      headerName: 'Payment status',
      width: 80,
      editable: false
    },
    {
      field: 'par_to_date',
      headerName: 'PAR',
      width: 80,
      editable: false
    },
    {
      field: 'actionTitle',
      headerName: 'Action',
      width: 180,
      editable: false
    },
    {
      field: 'In',
      headerName: 'In charge',
      width: 80,
      editable: false,
      renderCell: (params) => {
        return params.row.client.length > 0 ? (
          params.row.client[0]?.person_in_charge
        ) : (
          <p style={{ color: 'red' }}>does not exist in data to track</p>
        );
      }
    }
  ];
  return (
    <div>
      <Paper sx={{ marginBottom: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bolder' }}>
        <p style={{ margin: 0, padding: 0 }}>list of clients with status {'<< ' + state.action + ' >>'}</p>
        <Tooltip title="Export to Excel">
          <FileCopyIcon sx={{ cursor: 'pointer' }} color="success" fontSize="small" />
        </Tooltip>
      </Paper>
      <MainCard>
        <div style={{ width: '70vw' }}>
          {state && (
            <DataGrid
              rows={state.visites}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 15
                  }
                }
              }}
              pageSizeOptions={[15]}
              disableRowSelectionOnClick
            />
          )}
        </div>
      </MainCard>
    </div>
  );
}

ListeClient.propTypes = {
  liste: PropTypes.array
};

export default ListeClient;
