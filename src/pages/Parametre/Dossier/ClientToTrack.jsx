import { Button, Grid } from '@mui/material';
import { Input } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { lienVisiteMenage } from 'static/Lien';
import { CreateContexte } from './Context';
import Table from './Table';

function ClientToTrack() {
  const { readUploadFile, setVisited, visited, setTrack, sendData, appelSortant } = React.useContext(CreateContexte);
  const [inputTrack, setInputTrack] = React.useState([]);

  const loadingCode = async () => {
    try {
      if (inputTrack.length > 0) {
        let table = [];
        for (let i = 0; i < inputTrack.length; i++) {
          table.push(inputTrack[i].unique_account_id);
        }
        const response = await axios.post(lienVisiteMenage + '/visited', { client: table });
        setVisited(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadingCode();
  }, [inputTrack]);

  const infoV = (id, property) => {
    let client = _.filter(visited, { codeclient: id });
    if (client.length > 0) {
      if (['dateSave', 'idDemande'].includes(property)) {
        return client[0]['' + property];
      }
      if (property === 'codeAgent') {
        return client[0]?.demandeur.codeAgent;
      }
      if (property === 'raison') {
        return client[0]?.demande.raison;
      }
    } else {
      return '';
    }
  };
  const calledOrNo = (value, type) => {
    if (value.length > 0) {
      return type === 'appel' ? 'called' : 'visited';
    } else {
      return type === 'appel' ? 'nCalled' : 'nVisited';
    }
  };

  const initiale = useSelector((state) => state?.initiale.initiale);
  const retournAction = (visites, called) => {
    let actionFinish = _.filter(initiale, { visited: visites, called: called })[0]?.action;
    return actionFinish;
  };

  const loadingClientAndVisited = () => {
    try {
      let table = [];
      for (let i = 0; i < inputTrack.length; i++) {
        table.push({
          ...inputTrack[i],
          objectVisite: {
            codeAgent: infoV(inputTrack[i].unique_account_id, 'codeAgent'),
            idDemande: infoV(inputTrack[i].unique_account_id, 'idDemande'),
            raison: infoV(inputTrack[i].unique_account_id, 'raison'),
            dateSave: infoV(inputTrack[i].unique_account_id, 'dateSave')
          },
          actionEnCours: retournAction(
            calledOrNo(_.filter(visited, { codeclient: inputTrack[i].unique_account_id }), 'visite'),
            calledOrNo(_.filter(appelSortant, { unique_account_id: inputTrack[i].unique_account_id }), 'appel')
          ),
          beginAction: retournAction(
            calledOrNo(_.filter(visited, { codeclient: inputTrack[i].unique_account_id }), 'visite'),
            calledOrNo(_.filter(appelSortant, { unique_account_id: inputTrack[i].unique_account_id }), 'appel')
          ),
          called: calledOrNo(_.filter(appelSortant, { unique_account_id: inputTrack[i].unique_account_id }), 'appel'),
          visited: calledOrNo(_.filter(visited, { codeclient: inputTrack[i].unique_account_id }), 'visite')
        });
      }
      setTrack(table);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadingClientAndVisited();
  }, [visited]);
  return (
    <Grid container>
      <Grid item lg={9} sm={6} md={6} sx={{ paddingLeft: '10px' }}>
        <Input type="file" name="upload" id="upload" onChange={(e) => readUploadFile(e, setInputTrack)} />
      </Grid>
      <Grid item lg={3} sm={6} md={6} sx={{ paddingLeft: '10px' }}>
        <Button color="primary" variant="contained" onClick={(e) => sendData(e)}>
          send
        </Button>
      </Grid>
      <Table />
    </Grid>
  );
}

export default ClientToTrack;
