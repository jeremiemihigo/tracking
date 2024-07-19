import { Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, message } from 'antd';
import axios from 'axios';
import SimpleBackdrop from 'components/Backdrop';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { config, lien_post } from 'static/Lien';
import * as XLSX from 'xlsx';
import * as xlsx from 'xlsx';
import { CreateContextDashboard } from './Context';

function UploadFile() {
  const [client, setClient] = React.useState();
  const [error, setError] = React.useState({ message: '', type: '' });
  const [sending, setSending] = React.useState(false);
  const [texteMessage, setTexteMessage] = React.useState('');
  const status = useSelector((state) => state.status.status);
  const { data } = React.useContext(CreateContextDashboard);
  const user = useSelector((state) => state.user.user);
  const today = useSelector((state) => state.today?.today);
  const [results, setResult] = React.useState();

  const role = useSelector((state) => state.role.role.filter((x) => x.id === user.fonction[0]));

  const readUploadFile = (e) => {
    e.preventDefault();
    setSending(true);
    setTexteMessage('Uploading in progress');
    setError({ message: '', type: '' });
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setClient(json);
        setSending(false);
        setTexteMessage('');
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    } catch (error) {
      alert('Error ' + error);
      setSending(false);
      setTexteMessage('');
    }
  };

  const search = (id) => {
    if (_.filter(data, { unique_account_id: id }).length > 0) {
      return _.filter(data, { unique_account_id: id })[0];
    } else {
      return null;
    }
  };
  const returnFeedback = (title) => {
    if (_.filter(status, { title: title.trim() }).length > 0) {
      return {
        idStatus: _.filter(status, { title: title.trim() })[0].idStatus,
        sla: _.filter(status, { title: title.trim() })[0].sla,
        title: _.filter(status, { title: title.trim() })[0].title
      };
    } else {
      return { idStatus: null, sla: null, title: null };
    }
  };
  const structure = () => {
    setSending(true);
    setTexteMessage('Cheking data in progress');
    let table = [];
    for (let i = 0; i < client.length; i++) {
      if (search(client[i].unique_account_id) !== null) {
        table.push({
          ...search(client[i].unique_account_id),
          nextStatusFile: client[i].nextstatus?.trim(),
          commentaire: client[i].commentaire?.trim(),
          laststatusFile: client[i].laststatus?.trim()
        });
      }
    }

    const now = new Date(today.datetime || null).toISOString().split('T')[0];
    let result = [];
    const lastStatus = (actions) => {
      if (actions.result.length === 0) {
        return actions.statusTitle;
      } else {
        return actions.result[actions.result.length - 1]['status'];
      }
    };
    for (let i = 0; i < table.length; i++) {
      result.push({
        id: i,
        feedbackSelect: returnFeedback(table[i].nextStatusFile).title,
        idStatus: returnFeedback(table[i].nextStatusFile).idStatus,
        status: lastStatus(table[i]) !== table[i].laststatusFile ? null : returnFeedback(table[i].laststatusFile).title,
        delaiPrevu: returnFeedback(table[i].laststatusFile).sla,
        dateFin: now,
        commentaire: table[i].commentaire,
        datedebut: table[i].updatedAt,
        role: role[0]?.title,
        codeAgent: user?.codeAgent,
        customer_id: table[i].unique_account_id
      });
    }
    setSending(false);
    setTexteMessage('');
    setResult(result);
  };
  React.useEffect(() => {
    if (client && data && role && role.length > 0) {
      structure();
    }
  }, [client]);
  const columns = [
    {
      field: 'customer_id',
      headerName: 'ID',
      width: 120,
      editable: false
    },

    {
      field: 'feedbackSelect',
      headerName: 'Next status',
      width: 180,
      editable: false
    },
    {
      field: 'status',
      headerName: 'last status',
      width: 180,
      editable: false
    },
    {
      field: 'role',
      headerName: 'role',
      width: 100,
      editable: false
    },
    {
      field: 'commentaire',
      headerName: 'commentaire',
      width: 150,
      editable: false
    },
    {
      field: 'delaiPrevu',
      headerName: 'Days',
      width: 50,
      editable: false
    },
    {
      field: 'codeAgent',
      headerName: 'Agent',
      width: 100,
      editable: false
    },
    {
      field: 'dateFin',
      headerName: 'Date',
      width: 80,
      editable: false,
      renderCell: (params) => {
        return moment(params.row.dateFin).format('DD/MM/YYYY');
      }
    }
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 5
    });
  };

  const uploadFichier = async (e) => {
    setSending(true);
    setTexteMessage('being processed');
    e.preventDefault();
    let tabErr = [];
    for (let i = 0; i < results.length; i++) {
      if (!results[i].feedbackSelect || !results[i].status || !results[i].status || !results[i].delaiPrevu) {
        tabErr.push(results[i].customer_id);
      }
    }
    if (tabErr.length > 0) {
      setSending(false);
      setTexteMessage('');
      success('Il y a un problème dans les données', 'error');
      let m = `${tabErr.length > 1 ? 'Veuillez verifier pour ces clients' : 'Veuillez verifier pour ce client'}`;
      setError({ message: `${m} : ${tabErr.join(',')}`, type: 'error' });
    } else {
      try {
        const response = await axios.post(lien_post + '/changestatusFile', { data: results }, config);
        if (response.status === 200) {
          setError({ message: response.data, type: 'success' });
          setSending(false);
          setTexteMessage('');
        } else {
          setError({ message: '' + response.data, type: 'error' });
          setSending(false);
          setTexteMessage('');
        }
      } catch (error) {
        setError({ message: '' + error?.message, type: 'warning' });
        setSending(false);
        setTexteMessage('');
      }
    }
  };

  const columnsTab = [
    {
      field: 'unique_account_id',
      headerName: 'unique_account_id',
      width: 120,
      editable: false
    },
    {
      field: 'nextstatus',
      headerName: 'nextstatus',
      width: 120,
      editable: false
    },
    {
      field: 'laststatus',
      headerName: 'laststatus',
      width: 150,
      editable: false
    },
    {
      field: 'commentaire',
      headerName: 'commentaire',
      width: 200,
      editable: false
    }
  ];
  const dataModel = [
    {
      unique_account_id: 'BDRC68964912',
      nextstatus: 'le status suivant',
      laststatus: "l'ancien statut du client",
      commentaire: 'votre commentaire',
      id: 1
    },
    {
      unique_account_id: 'BDRC68964912',
      nextstatus: 'le status suivant',
      laststatus: "l'ancien statut du client",
      commentaire: 'votre commentaire',
      id: 2
    },
    {
      unique_account_id: 'BDRC68964912',
      nextstatus: 'le status suivant',
      laststatus: "l'ancien statut du client",
      commentaire: 'votre commentaire',
      id: 3
    }
  ];

  const loadingStatus = () => {
    let tab = [];
    if (status && status.length > 0) {
      for (let i = 0; i < status.length; i++) {
        tab.push({
          process: status[i].process.title,
          status: status[i].title,
          role: status[i].roles[0].title,
          sla: status[i].sla
        });
      }
    }
    const worksheet = XLSX.utils.json_to_sheet(tab);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'status');
    XLSX.writeFile(workbook, `status.xlsx`);
  };
  return (
    <>
      {contextHolder}
      <SimpleBackdrop open={sending} title={texteMessage} taille="10rem" />
      {error.message && <Alert message={error.message} type={error.type} closable />}
      <div>
        <input type="file" id="actual-btn" accept=".xlsx" hidden onChange={(e) => readUploadFile(e)} />
        <label className="label" htmlFor="actual-btn">
          Choose File
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        {results && results.length > 0 && (
          <Button variant="contained" color="primary" onClick={(e) => uploadFichier(e)}>
            send
          </Button>
        )}
      </div>
      {!results && (
        <div>
          <p style={{ textAlign: 'center', padding: '10px' }}>
            commentaire : Le tableau que vous allez importer doit obligatoirement contenir ces quatre champs, et{' '}
            <span
              onClick={() => loadingStatus()}
              style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bolder' }}
            >
              les status
            </span>{' '}
            doivent avoir la même orthographe que ceux enregistrés dans default tracker
          </p>
          <div className="containerGrid">
            <div className="dataGrid">
              <DataGrid
                rows={dataModel}
                columns={columnsTab}
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
            </div>
          </div>
        </div>
      )}
      <Grid container>
        <Grid item lg={12}>
          {results && results?.length > 0 && (
            <DataGrid
              rows={results}
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
      </Grid>
    </>
  );
}

export default UploadFile;
