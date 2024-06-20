import { Add } from '@mui/icons-material';
import { Fab, Grid, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'antd';
import MainCard from 'components/MainCard';
import React from 'react';
import { useSelector } from 'react-redux';
import Popup from 'static/Popup';
import AddDepartement from './AddDepartement';
import AddFonction from './AddFonction';
import AddLink from './AddLink';

function Index() {
  const departement = useSelector((state) => state.departement.departement);
  const [add, setAdd] = React.useState(false);
  const [dept, setDept] = React.useState();
  const [open, setOpen] = React.useState(false);
  const addoption = (data) => {
    setDept(data);
    setOpen(true);
  };
  const columns = [
    {
      field: 'idDepartement',
      headerName: 'ID',
      width: 55,
      editable: false
    },
    {
      field: 'departement',
      headerName: 'Departement',
      width: 150,
      editable: false
    },
    {
      field: 'fonction',
      headerName: 'Fonction',
      width: 400,
      editable: false,
      renderCell: (params) => {
        return params.row.fonction?.map((x) => x.fonction + ' ; ');
      }
    },
    {
      field: 'Option',
      headerName: 'Options',
      width: 70,
      editable: false,
      renderCell: (params) => {
        return (
          <Tooltip title="Add fonction">
            <Fab size="small" onClick={(e) => addoption(params.row.idDepartement)}>
              <Add fontSize="small" />
            </Fab>
          </Tooltip>
        );
      }
    }
  ];
  function getRowId(row) {
    return row.idDepartement;
  }
  return (
    <MainCard>
      <Grid container>
        <Grid item lg={8}>
          <Button type="primary" onClick={(e) => setAdd(true)}>
            Add Department
          </Button>
          {departement && (
            <div>
              <DataGrid
                rows={departement}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20
                    }
                  }
                }}
                getRowId={getRowId}
                pageSizeOptions={[20]}
                disableRowSelectionOnClick
              />
            </div>
          )}
        </Grid>
        <Grid item lg={4}>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bolder' }}>Link</p>
          <AddLink />
        </Grid>
      </Grid>
      {dept && (
        <Popup open={open} setOpen={setOpen} title="Fonction">
          <AddFonction dept={dept} />
        </Popup>
      )}
      <Popup open={add} setOpen={setAdd} title="Department">
        <AddDepartement />
      </Popup>
    </MainCard>
  );
}

export default Index;
