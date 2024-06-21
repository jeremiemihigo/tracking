import { SearchOutlined } from '@ant-design/icons';
import { Edit } from '@mui/icons-material';
import { Fab, FormControl, Grid, InputAdornment, OutlinedInput, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import Popup from 'static/Popup';
import AddAction from './AddAction';
import AddStatus from './AddStatus';
import Process from './Process';
import './styles.css';

function Table({ status, openProcess, addstatus, addaction }) {
  const [filterFn, setFilterFn] = React.useState({
    fn: (items) => {
      return items;
    }
  });
  const handleChanges = (e) => {
    let target = e.target.value;
    setFilterFn({
      fn: (items) => {
        if (target === '') {
          return items;
        } else {
          return items.filter((x) => x.title.includes(target));
        }
      }
    });
  };
  const [donner, setDonner] = React.useState();
  const [open, setOpen] = React.useState(false);
  const dataEdit = (donner, e) => {
    e.preventDefault();
    setDonner(donner);
    setOpen(true);
  };
  const [openprocess, setopenprocess] = React.useState(false);
  const [dataprocess, setDataprocess] = React.useState();
  const processfunction = (data, statut) => {
    setDataprocess({ data, statut });
    setopenprocess(true);
  };
  const [openaction, setopenaction] = React.useState(false);
  const [dataaction, setDataaction] = React.useState();
  const actionfunction = (data, statut) => {
    setDataaction({ data, statut });
    setopenaction(true);
  };
  return (
    <Grid>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'center',
          background: '#dedede',
          marginBottom: '10px',
          padding: '10px'
        }}
        elevation={3}
      >
        <Grid onClick={() => openProcess(true)} sx={{ cursor: 'pointer' }}>
          <Typography>Add process</Typography>
        </Grid>
        <Grid sx={{ margin: '0px 10px', cursor: 'pointer' }} onClick={() => addstatus(true)}>
          <Typography>Add status</Typography>
        </Grid>
        <Grid sx={{ cursor: 'pointer' }} onClick={() => addaction(true)}>
          <Typography>Add action</Typography>
        </Grid>
        <Grid sx={{ paddingLeft: '20px' }}>
          <FormControl sx={{ width: '100%' }}>
            <OutlinedInput
              size="small"
              id="header-search"
              startAdornment={
                <InputAdornment position="start" sx={{ mr: -0.5 }}>
                  <SearchOutlined />
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              inputProps={{
                'aria-label': 'weight'
              }}
              onChange={(e) => handleChanges(e)}
              placeholder="Search status"
            />
          </FormControl>
        </Grid>
      </Paper>
      <table>
        <thead>
          <tr>
            <th>Process</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            <th>Actions</th>
            <th>Instruction</th>
            <th>Role</th>
            <th>SLA</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {status &&
            filterFn.fn(status).map((index, key) => {
              return (
                <tr key={key}>
                  <td className="tdProcess" onClick={() => processfunction(index.process, index.idStatus)}>
                    {index?.process?.title}
                  </td>
                  <td>{index?.title}</td>
                  <td>
                    {index?.actions.length > 0 ? (
                      <ol>
                        {index?.actions?.map((item) => {
                          return (
                            <li className="liAction" onClick={() => actionfunction(item, index.idStatus)} key={item}>
                              {item?.title}{' '}
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      'Aucune action'
                    )}
                  </td>
                  <td>{index?.instruction}</td>
                  <td>
                    {' '}
                    <Typography noWrap sx={{ fontSize: '12px' }}>
                      {index?.roles[0]?.title}
                    </Typography>
                  </td>
                  <td>{index?.sla}j</td>
                  <td>
                    <Tooltip title="Edit" onClick={(e) => dataEdit(index, e)}>
                      <Fab size="small" color="primary">
                        <Edit fontSize="small" sx={{ cursor: 'pointer', float: 'right' }} />
                      </Fab>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Popup open={open} setOpen={setOpen} title="Edit status">
        <AddStatus edit={donner} />
      </Popup>
      <Popup open={openprocess} setOpen={setopenprocess} title="Edit process">
        <Process donner={dataprocess} />
      </Popup>
      <Popup open={openaction} setOpen={setopenaction} title="Edit Action">
        <AddAction donner={dataaction} />
      </Popup>
    </Grid>
  );
}

export default Table;
