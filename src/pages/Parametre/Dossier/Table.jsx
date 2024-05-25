/* eslint-disable react/prop-types */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import _ from 'lodash';
import './style.css';

function Table({ dataToSend }) {
  const action = useSelector((state) => state.action?.action);
  let analyse = _.groupBy(dataToSend, 'beginAction');
  function getRowId(row) {
    return row.customer_name;
  }

  const retournAction = (idAction) => {
    console.log(_.filter(action, { idAction }));
    return _.filter(action, { idAction });
  };

  const columns = [
    {
      field: 'unique_account_id',
      headerName: 'ID',
      width: 110,
      editable: false
    },
    {
      field: 'customer_name',
      headerName: 'customer_name',
      width: 130,
      editable: false
    },

    {
      field: 'shop_region',
      headerName: 'Region',
      width: 80,
      editable: false
    },
    {
      field: 'shop_name',
      headerName: 'Shop',
      width: 100,
      editable: false
    },
    {
      field: 'par_to_date',
      headerName: 'PAR',
      width: 130,
      editable: false
    },
    {
      field: 'beginAction',
      headerName: 'après Analyse',
      width: 200,
      editable: false,
      renderCell: (params) => {
        return retournAction(params.row.beginAction)[0]?.title;
      }
    }
  ];
  return (
    <div style={{ marginTop: '20px' }}>
      <Grid container>
        <Grid item lg={8}>
          {dataToSend && dataToSend !== 'token expired' && dataToSend.length > 0 && (
            <DataGrid
              getRowId={getRowId}
              rows={dataToSend}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10
                  }
                }
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          )}
        </Grid>
        <Grid item lg={4}>
          {Object.keys(analyse).map((index, key) => {
            return (
              <div key={key} className="actionAnalyse">
                <div>
                  <p className="actionTitle">{retournAction(index).length > 0 ? retournAction(index)[0]?.title : 'Action introuvable'}</p>
                  <p style={{ fontSize: '11px', fontWeight: 'bolder' }} className="actionTitle">
                    {retournAction(index).length > 0 && retournAction(index)[0]?.roles[0]?.title}
                  </p>
                </div>
                <div>
                  <p className="actionTaille">{analyse[index].length}</p>
                </div>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
export default Table;
