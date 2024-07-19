import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { message } from 'antd';
import axios from 'axios';
import SimpleBackdrop from 'components/Backdrop';
import MainCard from 'components/MainCard';
import PaperHead from 'pages/Component/PaperHead';
import React from 'react';
import { lienVisiteMenage, lien_post } from 'static/Lien';
import { CreateContextDashboard } from './Context';

function Visited() {
  const { data } = React.useContext(CreateContextDashboard);
  const [donner, setDonner] = React.useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 5
    });
  };
  const fetch = () => {
    if (data && data.length > 0) {
      const donne = data.filter((x) => x.statusEnCours === 'XZ445X' || x.statusEnCours === 'Y13JKS');
      setDonner(donne);
    }
  };
  React.useEffect(() => {
    fetch();
  }, []);
  const columns = [
    {
      field: 'unique_account_id',
      headerName: 'code client',
      width: 120,
      editable: false
    },
    {
      field: 'customer_name',
      headerName: 'Name',
      width: 100,
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
      field: 'lastStatusDetail',
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
      field: 'statusTitle',
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
              fontSize: '9px',
              padding: '3px',
              borderRadius: '5px',
              color: 'white',
              margin: '0px',
              backgroundColor: `${params.row.sla === 'OUTSLA' ? 'red' : 'green'}`
            }}
          >
            {params.row.sla}
          </p>
        );
      }
    }
  ];
  const [operation, setOperation] = React.useState(false);
  const [texteMessage, setTexteMessage] = React.useState('');
  const sendListe = async () => {
    try {
      setOperation(true);
      let table = [];
      setTexteMessage('Recherche code client');
      for (let i = 0; i < donner.length; i++) {
        table.push(donner[i].unique_account_id);
      }
      setTexteMessage('Search last visit');
      const response = await axios.post(lienVisiteMenage + '/visited', { client: table });
      if (response.status === 200 && response.data.length > 0) {
        let v = [];
        for (let i = 0; i < response.data.length; i++) {
          v.push({
            codeAgent: response.data[i].demandeur.codeAgent,
            raison: response.data[i].demande.raison,
            dateSave: response.data[i].dateSave,
            idDemande: response.data[i].idDemande,
            codeclient: response.data[i].codeclient,
            periode: response.data[i].demande.lot
          });
        }
        setTexteMessage('Default tracker');
        const tracker = await axios.post(lien_post + '/feedbackvm', { data: v });
        setTexteMessage('Done');
        if (tracker.status === 200) {
          success(tracker.data, 'success');
          setOperation(false);
        }
      }
      if (response.status === 201) {
        success(response.data, 'error');
        setOperation(false);
      }
    } catch (error) {
      setOperation(false);
      success(error, 'error');
    }
  };

  return (
    <>
      {contextHolder}
      <SimpleBackdrop open={operation} title={texteMessage} taille="10rem" />
      <PaperHead functionExec={sendListe} texte="Client a visiste" />
      <MainCard>
        <Grid>
          {donner && (
            <DataGrid
              rows={donner}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 6
                  }
                }
              }}
              pageSizeOptions={[6]}
              disableRowSelectionOnClick
            />
          )}
        </Grid>
      </MainCard>
    </>
  );
}

export default Visited;
