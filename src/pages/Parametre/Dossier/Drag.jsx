/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import * as xlsx from 'xlsx';
import { Alert, Button, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { lien, config } from 'static/Lien';
import SendIcon from '@mui/icons-material/Send';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import AutoComplement from 'components/AutoComplete';

// import DirectionSnackbar from "../static/SnackBar";

function Drag() {
  const [excelData, setExcelData] = React.useState();
  const [excelFileError, setExcelFileError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [donner, setDonner] = React.useState();
  const main = useSelector((state) => state.main?.main);
  const status = useSelector((state) => state.status?.status);
  const action = useSelector((state) => state.action?.action);

  const [mainSelect, setMainSelect] = React.useState('');
  const [processSelect, setprocessSelect] = React.useState('');
  const [listeStatus, setListe] = React.useState('');
  const [statusSelect, setstatusSelect] = React.useState('');
  const [actionDefault, setActionDefault] = React.useState('');

  React.useEffect(() => {
    try {
      if (processSelect) {
        let i = status.filter((x) => x.idProcess === processSelect?.idProcess);
        if (action && action.length > 0) {
          let actionDefault = action.filter((y) => y.default === true);
          setActionDefault(actionDefault[0]?.idAction);
        }
        // ;
        setListe(i);
      }
    } catch (error) {
      alert('Error ' + error);
    }
  }, [processSelect]);

  const readUploadFile = (e) => {
    e.preventDefault();
    try {
      if (e.target.files) {
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = xlsx.utils.sheet_to_json(worksheet);
          setExcelData(json);
          setLoading(false);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
    } catch (error) {
      alert('Error ' + error);
    }
  };

  const sendData = async () => {
    setLoading(true);
    if (donner && donner.length > 0) {
      let dataSend = [];
      let nombre = 0;
      try {
        for (let i = 0; i < donner.length; i++) {
          nombre = nombre + i;
          dataSend.push(donner[i]);
          if (nombre == 3) {
            const response = await axios.post(
              lien + '/client',
              {
                data: dataSend
              },
              config
            );
            console.log(response);
            nombre = 0;
            dataSend = [];
          }
          if (i === donner.length - 1) {
            const response = await axios.post(
              lien + '/client',
              {
                data: dataSend
              },
              config
            );
            console.log(response);
          }
        }
        // window.location.replace('/parametre');
      } catch (error) {
        setLoading(false);
        setExcelFileError(error);
      }
    }
  };

  const structureData = () => {
    try {
      if (excelData) {
        let table = [];
        for (let i = 0; i < excelData.length; i++) {
          table.push({
            unique_account_id: excelData[i].unique_account_id,
            customer_name: excelData[i].customer_name,
            customer_status: excelData[i].customer_status,
            payment_status: excelData[i].payment_status,
            enable_status: excelData[i].enable_status,
            date_timestamp: new Date((excelData[i].date_timestamp - (25567 + 2)) * 86400 * 1000),
            expiry_timestamp: new Date((excelData[i].expiry_timestamp - (25567 + 2)) * 86400 * 1000),
            default_timestamp: new Date((excelData[i].default_timestamp - (25567 + 2)) * 86400 * 1000),
            shop_region: excelData[i].shop_region,
            shop_name: excelData[i].shop_name,
            par_to_date: excelData[i].par_to_date,
            beginAction: actionDefault,
            actionEnCours: actionDefault
          });
        }
        setDonner(table);
      }
    } catch (error) {
      alert('Error ' + error);
    }
  };
  React.useEffect(() => {
    structureData();
  }, [excelData]);

  return (
    <div>
      {excelFileError && (
        <div className="mb-4">
          <Alert severity="warning" variant="standard">
            {excelFileError && excelFileError}
          </Alert>
        </div>
      )}

      <Grid container>
        {main && main.length > 0 && (
          <Grid item lg={3}>
            <AutoComplement value={mainSelect} setValue={setMainSelect} options={main} title="Main" propr="title" />
          </Grid>
        )}
        {mainSelect && mainSelect.allProcess.length > 0 && (
          <Grid item lg={3} sx={{ padding: '0px 5px' }}>
            <AutoComplement
              value={processSelect}
              setValue={setprocessSelect}
              options={mainSelect.allProcess}
              title="Process"
              propr="title"
            />
          </Grid>
        )}
        {listeStatus && listeStatus.length > 0 && (
          <Grid item lg={3}>
            <AutoComplement value={statusSelect} setValue={setstatusSelect} options={listeStatus} title="Status" propr="title" />
          </Grid>
        )}

        <Grid item lg={3} sx={{ padding: '0px 5px' }}>
          <form>
            <Input type="file" name="upload" id="upload" onChange={readUploadFile} />
          </form>
          <div style={{ marginTop: '10px' }}>
            <Button fullWidth disabled={loading} color="primary" variant="contained" onClick={() => sendData()} sx={{ marginLeft: '10px' }}>
              {loading && <CircularProgress size={15} sx={{ marginRight: '15px' }} color="inherit" />}{' '}
              {!loading && <SendIcon fontSize="small" />}
              <span style={{ fontSize: '12px', padding: '0px', marginLeft: '10px' }}>{loading ? 'Sending...' : 'Envoyer'}</span>
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Drag;
