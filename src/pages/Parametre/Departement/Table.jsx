import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { CreateContexte } from './Context';

function Table() {
  const liste = useSelector((state) => state.departement?.departement);
  const { handleDepartement } = React.useContext(CreateContexte);
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      editable: false
    },
    {
      field: 'title',
      headerName: 'Département',
      width: 180,
      editable: false
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 70,
      editable: false,
      renderCell: (params) => {
        return params.row.role.length;
      }
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 70,
      editable: false,
      renderCell: (params) => {
        return (
          <Typography sx={{ color: 'blue', cursor: 'pointer' }} component="span" onClick={() => handleDepartement(params.row)}>
            Détails
          </Typography>
        );
      }
    }
  ];
  return (
    <div>
      {liste && liste.length > 0 && (
        <DataGrid
          rows={liste}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7
              }
            }
          }}
          pageSizeOptions={[7]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </div>
  );
}

export default Table;
