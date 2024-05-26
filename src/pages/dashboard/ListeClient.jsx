import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';
import _ from 'lodash';
import PaperHead from 'pages/Component/PaperHead';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function ListeClient() {
  const location = useLocation();
  const { state } = location;
  const allaction = useSelector((state) => state.action?.action);

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
        return params.row.client.length > 0 ? params.row.client[0]?.person_in_charge : 'is not in the data to track';
      }
    }
  ];
  React.useEffect(() => {
    setTimeout(() => {
      if (Notification.permission !== 'denied') {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
          // If the user accepts, let's create a notification
          if (permission === 'granted') {
            new Notification('Je suis un nouveau message');
          }
        });
      }
    }, 3000);
  }, []);

  const returnAction = (id) => {
    if (allaction && allaction.length > 0) {
      return _.filter(allaction, { idAction: id })[0]?.title;
    }
  };

  return (
    <div>
      <PaperHead texte={`list of clients with status ${'<< ' + returnAction(state.action) + ' >>'}`} />
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
