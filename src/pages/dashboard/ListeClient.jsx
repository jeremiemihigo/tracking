import { CreateContexteGlobal } from 'GlobalContext';
import { message } from 'antd';
import axios from 'axios';
import SimpleBackdrop from 'components/Backdrop';
import MainCard from 'components/MainCard';
import _ from 'lodash';
import PaperHead from 'pages/Component/PaperHead';
import AffichageData from 'pages/DataToTrack';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { lienVisiteMenage, lien_post } from 'static/Lien';

function ListeClient() {
  const location = useLocation();
  const { handleLogout } = React.useContext(CreateContexteGlobal);
  React.useLayoutEffect(() => {
    if (!location.state?.action) {
      handleLogout();
    }
  }, []);
  const visites = location.state?.visites;
  const action = location.state?.action;

  // const columns = [
  //   {
  //     field: 'unique_account_id',
  //     headerName: 'code client',
  //     width: 120,
  //     editable: false
  //   },
  //   {
  //     field: 'customer_name',
  //     headerName: 'NOMS',
  //     width: 150,
  //     editable: false
  //   },
  //   {
  //     field: 'shop_name',
  //     headerName: 'Shop',
  //     width: 100,
  //     editable: false
  //   },
  //   {
  //     field: 'shop_region',
  //     headerName: 'Region',
  //     width: 100,
  //     editable: false
  //   },
  //   {
  //     field: 'payment_status',
  //     headerName: 'Payment status',
  //     width: 80,
  //     editable: false
  //   },
  //   {
  //     field: 'par_to_date',
  //     headerName: 'PAR',
  //     width: 80,
  //     editable: false
  //   },
  //   {
  //     field: 'statusTitle',
  //     headerName: 'Statut',
  //     width: 180,
  //     editable: false
  //   },
  //   {
  //     field: 'In',
  //     headerName: 'In charge',
  //     width: 80,
  //     editable: false,
  //     renderCell: (params) => {
  //       return params.row.person_in_charge;
  //     }
  //   }
  // ];
  const [actions, setActions] = React.useState([]);
  const status = useSelector((state) => state.status?.status);

  React.useEffect(() => {
    setActions(_.filter(status, { idStatus: action }));
  }, [action]);

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 5
    });
  };

  const [operation, setOperation] = React.useState(false);
  const [texteMessage, setTexteMessage] = React.useState('');
  const sendListe = async () => {
    try {
      setOperation(true);
      let table = [];
      setTexteMessage('Recherche code client');
      for (let i = 0; i < visites.length; i++) {
        table.push(visites[i].unique_account_id);
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
    <div>
      {contextHolder}
      <SimpleBackdrop open={operation} title={texteMessage} taille="10rem" />
      <PaperHead
        functionExec={action === 'XZ445X' && sendListe}
        texte={`list of customers with status ${`<< ${actions.length > 0 ? actions[0].title : action} >>`}`}
      />
      <MainCard>
        {visites && <AffichageData clients={visites} />}

        {/* <div style={{ width: '70vw' }}>
          {visites && visites.length > 0 && (
            <DataGrid
              rows={visites}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 30
                  }
                }
              }}
              pageSizeOptions={[30]}
              disableRowSelectionOnClick
            />
          )}
        </div> */}
      </MainCard>
    </div>
  );
}

ListeClient.propTypes = {
  liste: PropTypes.array
};

export default ListeClient;
