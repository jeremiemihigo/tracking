import { FileCopy } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Tooltip, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { DataGrid } from '@mui/x-data-grid';
import { message } from 'antd';
import axios from 'axios';
import Input from 'components/Input';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { config, differenceDays, lien_post, sla } from 'static/Lien';
import { Button } from '../../../node_modules/@mui/material/index';
import './history.css';

function Index() {
  const [codeclient, setCodeclient] = React.useState('');
  const [data, setData] = React.useState();
  const [allmonth, setAllMonth] = React.useState('start');
  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };
  const loading = async (e) => {
    e.preventDefault();
    setAllMonth('loading');
    try {
      const response = await axios.post(lien_post + '/history', { codeclient }, config);
      if (response.status === 201) {
        success(response.data, 'error');
      }
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (data) {
      setAllMonth(Object.keys(_.groupBy(data, 'month')));
    }
  }, [data]);

  const returnField = (month, field) => {
    if (field === 'begin') {
      console.log(_.filter(data, { month }));
      return _.filter(data, { month })[0].begin.title;
    } else {
      return _.filter(data, { month })[0]['' + field];
    }
  };
  const retournFieldMonth = (month) => {
    let table = [];
    let dataMonth = _.filter(data, { month });
    for (let i = 0; i < dataMonth.length; i++) {
      if (dataMonth[i].delaiPrevu) {
        table.push({
          ...dataMonth[i],
          sla: sla(dataMonth[i]),
          id: i
        });
      }
    }
    console.log(table);
    return table;
  };

  const columns = [
    {
      field: 'dateFin',
      headerName: 'Date',
      width: 50,
      editable: false,
      renderCell: (params) => {
        return dayjs(params.row.dateFin).format('DD/MM');
      }
    },
    {
      field: 'codeAgent',
      headerName: 'Nom',
      width: 100,
      editable: false
    },
    {
      field: 'action',
      headerName: 'Statut',
      width: 140,
      editable: false
    },
    {
      field: 'feedbackSelect',
      headerName: 'Action select',
      width: 140,
      editable: false
    },
    {
      field: 'commentaire',
      headerName: 'Commentaire',
      width: 200,
      editable: false
    },
    {
      field: 'sla',
      headerName: 'SLA',
      width: 50,
      editable: false,
      renderCell: (params) => {
        if (params.row.sla === 'INSLA') {
          return <p style={{ background: '#619f62', color: '#fff', fontSize: '9px', padding: '2px', borderRadius: '5px' }}>INSLA</p>;
        } else {
          return <p style={{ background: '#971a0b', color: '#fff', fontSize: '10px', padding: '2px', borderRadius: '5px' }}>OUTSLA</p>;
        }
      }
    },
    {
      field: 'day',
      headerName: 'Day',
      width: 50,
      editable: false,
      renderCell: (params) => {
        return (
          <p
            style={{
              background: params.row.sla === 'INSLA' ? '#619f62' : '#971a0b',
              color: '#fff',
              width: '100%',
              textAlign: 'center',
              fontSize: '10px',
              padding: '2px',
              borderRadius: '5px'
            }}
          >{`${differenceDays(params.row.dateFin, params.row.dateDebut)}/${params.row.delaiPrevu}`}</p>
        );
      }
    }
  ];

  const SkeletonComponent = () => {
    return <Skeleton variant="text" sx={{ fontSize: '1rem', marginLeft: '5px' }} />;
  };

  return (
    <>
      <Paper sx={{ padding: '5px' }}>
        {contextHolder}
        <Grid container>
          <Grid item lg={4} sx={{ paddingRight: '10px' }}>
            <Input label="Code client, nom du client" value={codeclient} setValue={setCodeclient} showIcon={true} />
          </Grid>
          <Grid item lg={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="confirm the search">
              <Button onClick={(e) => loading(e)} variant="contained" color="primary">
                <SearchIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Grid>
          <Grid item lg={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Export to excel">
              <Button variant="contained" color="success">
                <FileCopy fontSize="small" color="inherit" />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
      {!['loading', 'start'].includes(allmonth) &&
        allmonth.length > 0 &&
        allmonth.map((index) => {
          return (
            <Grid container sx={{ marginTop: '10px' }} key={index}>
              <Grid item lg={2} xs={12} sm={4} md={4}>
                <Paper>
                  <Grid sx={{ padding: '5px', backgroundColor: '#002d72', color: '#fff', borderRadius: '5px' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bolder' }} noWrap>
                      {data && data[0]?.customer_name}
                    </Typography>
                  </Grid>
                  <Grid sx={{ padding: '5px' }} key={index}>
                    <Grid className="month">{data[0]?.month}</Grid>
                    <Grid container>
                      <Grid item lg={12} xs={12} sm={12} md={12} className="grid">
                        <Typography className="title">Region</Typography>
                        <Typography className="values">{returnField(index, 'shop_region')}</Typography>
                      </Grid>
                      <Grid item lg={12} xs={12} sm={12} md={12} className="grid">
                        <Typography className="title">Shop</Typography>
                        <Typography className="values">{returnField(index, 'shop_name')}</Typography>
                      </Grid>
                      <Grid item lg={12} xs={12} sm={12} md={12} className="grid">
                        <Typography className="title">par_to_date</Typography>
                        <Typography className="values">{returnField(index, 'par_to_date')}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item lg={12} xs={12} sm={12} md={12} className="grid">
                        <Typography className="title">expiry_timestamp</Typography>
                        <Typography className="values">{returnField(index, 'expiry_timestamp')}</Typography>
                      </Grid>
                      <Grid item lg={12} xs={12} sm={12} md={12} className="grid">
                        <Typography className="title">date_timestamp</Typography>
                        <Typography className="values">{returnField(index, 'date_timestamp')}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item lg={12} xs={12} sm={12} md={12} className="grid">
                        <Typography className="title">First action</Typography>
                        <Typography className="values">{returnField(index, 'begin')}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid
                sx={{ padding: { md: '0px 10px', sm: '0px 10px' }, marginTop: { xs: '10px', lg: '0px' } }}
                item
                lg={10}
                xs={12}
                sm={8}
                md={8}
              >
                <Paper>
                  <Grid sx={{ padding: '5px', borderRadius: '5px' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bolder' }} noWrap>
                      All actions of the month carried out on this client
                    </Typography>
                  </Grid>
                  <Grid sx={{ padding: '5px', height: '18.5rem' }}>
                    <DataGrid
                      rows={retournFieldMonth(index)}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 3
                          }
                        }
                      }}
                      pageSizeOptions={[3]}
                      disableRowSelectionOnClick
                    />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          );
        })}
      {allmonth === 'loading' && (
        <>
          <Grid container sx={{ marginTop: '10px' }}>
            <Grid item lg={2}>
              <Paper>
                <Grid sx={{ padding: '5px', backgroundColor: '#002d72', color: '#fff', borderRadius: '5px' }}>
                  <Typography sx={{ fontSize: '12px', fontWeight: 'bolder' }} noWrap>
                    <SkeletonComponent />
                  </Typography>
                </Grid>
                <Grid sx={{ padding: '5px' }}>
                  <Grid className="month">
                    <SkeletonComponent />
                  </Grid>
                  <Grid container>
                    <Grid item lg={12} className="grid">
                      <Typography className="title">Region</Typography>
                      <Typography className="values">
                        <SkeletonComponent />
                      </Typography>
                    </Grid>
                    <Grid item lg={12} className="grid">
                      <Typography className="title">Shop</Typography>
                      <Typography className="values">
                        <SkeletonComponent />
                      </Typography>
                    </Grid>

                    <Grid item lg={12} className="grid">
                      <Typography className="title">par_to_date</Typography>
                      <Typography className="values">
                        <SkeletonComponent />
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={12} className="grid">
                      <Typography className="title">expiry_timestamp</Typography>
                      <Typography className="values">
                        <SkeletonComponent />
                      </Typography>
                    </Grid>

                    <Grid item lg={12} className="grid">
                      <Typography className="title">date_timestamp</Typography>
                      <Typography className="values">
                        <SkeletonComponent />
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={12} className="grid">
                      <Typography className="title">First action</Typography>
                      <Typography className="values">
                        <SkeletonComponent />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item lg={8}>
              <Paper sx={{ marginLeft: '10px' }}>
                <Grid sx={{ padding: '5px', borderRadius: '5px' }}>
                  <Typography sx={{ fontSize: '12px', fontWeight: 'bolder' }} noWrap>
                    All the actions of this month
                  </Typography>
                </Grid>
                <Grid sx={{ padding: '5px' }}>
                  <Skeleton variant="rounded" width="100%" height={120} />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
export default Index;
