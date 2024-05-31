import { Save } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { Input, message } from 'antd';
import axios from 'axios';
import Selected from 'components/Selected';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { lienVisiteMenage, lien_post } from 'static/Lien';
import { CreateContexte } from './Context';
import Table from './Table';

function AllAdresse() {
  const [allAdresse, setAllAdress] = React.useState();
  const [appel, setAppel] = React.useState();
  const [appelSortant, setAppelSortant] = React.useState();
  const [fileToTrack, setFileToTrack] = React.useState();
  const [demandeFeedBack, setDemandeFeed] = React.useState();
  const [statValue, setStatValue] = React.useState('');
  const [loadVisites, setLoadVisites] = React.useState({ bool: false, message: '' });

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  const [visited, setVisited] = React.useState([]);

  const { readUploadFile, sendData, setOpen } = React.useContext(CreateContexte);

  const initiale = useSelector((state) => state?.initiale.initiale);

  const retournAction = (visites, called) => {
    let visiter = visites.length > 0 ? 'visited' : 'nVisited';
    let appel = called.length > 0 ? 'called' : 'nCalled';
    let actionFinish = _.filter(initiale, { visited: visiter, called: appel })[0]?.action;
    visiter = undefined;
    appel = undefined;
    return actionFinish;
  };
  const [track, setDonner] = React.useState();

  const returnVisiteInfo = (codeclient) => {
    let a = _.filter(visited, { codeclient });
    if (a.length > 0) {
      if (a.length > 1) {
        let indice = a.length === 1 ? 0 : 1;
        return {
          codeAgent: a[indice].demandeur.codeAgent,
          idDemande: a[indice].idDemande,
          raison: a[indice].demande.rairon,
          dateSave: a[indice].dateSave
        };
      }
    } else {
      return 'nVisited';
    }
  };

  const infoV = (visit, property) => {
    console.log(visit);
    if (visit.length > 0) {
      if (['dateSave', 'idDemande'].includes(property)) {
        return visit[0]['' + property];
      }
      if (property === 'codeAgent') {
        return visit[0]?.demandeur.codeAgent;
      }
      if (property === 'raison') {
        return visit[0]?.demande.raison;
      }
    } else {
      return '';
    }
  };
  const rechercheSiClientAppeler = () => {
    if (track && track.length > 0) {
      setOpen(true);
      let table = [];
      let actionss = '';
      for (let i = 0; i < track.length; i++) {
        actionss = retournAction(
          _.filter(visited, { codeclient: track[i]['unique_account_id'] }),
          _.filter(appelSortant, { unique_account_id: track[i]['unique_account_id'] })
        );
        table.push({
          ...track[i],
          actionEnCours: actionss,
          beginAction: actionss,
          visited: returnVisiteInfo(_.filter(visited, { codeclient: track[i]['unique_account_id'] })),
          objectVisite: {
            codeAgent: infoV(returnVisiteInfo(_.filter(visited, { codeclient: track[i]['unique_account_id'] })), 'codeAgent'),
            idDemande: infoV(returnVisiteInfo(_.filter(visited, { codeclient: track[i]['unique_account_id'] })), 'idDemande'),
            raison: infoV(returnVisiteInfo(_.filter(visited, { codeclient: track[i]['unique_account_id'] })), 'raison'),
            dateSave: infoV(returnVisiteInfo(_.filter(visited, { codeclient: track[i]['unique_account_id'] })), 'dateSave')
          },
          called: _.filter(appelSortant, { unique_account_id: track[i]['unique_account_id'] }).length > 0 ? 'called' : 'nCalled'
        });
      }
      setDemandeFeed(table);
      setOpen(false);
    }
  };
  React.useEffect(() => {
    if (fileToTrack && statValue) {
      setDonner(_.filter(_.uniqBy(fileToTrack, 'unique_account_id'), { payment_status: statValue }));
      rechercheSiClientAppeler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToTrack, statValue]);

  const loadingVisites = async () => {
    try {
      setLoadVisites(true);
      const response = await axios.get(lienVisiteMenage + '/trackingLoading');
      if (response.status === 201) {
        success(response.data, 'error');
        setLoadVisites({ bool: false, message: response.data });
      }
      if (response.status === 200) {
        setVisited(response.data);
        setLoadVisites({ bool: true, message: 'connected successfuly' });
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadingVisites();
  }, []);

  const sendings = (e) => {
    e.preventDefault();
    sendData({ donner: demandeFeedBack, lien: lien_post + '/client' });
  };

  return (
    <>
      {contextHolder}
      <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
        <Typography
          component="p"
          sx={{ fontSize: '10px', fontWeight: 'bolder', color: `${loadVisites.bool ? 'green' : 'red'}`, margin: 0, padding: 0 }}
        >
          {loadVisites.message}
        </Typography>
      </div>
      <Grid container>
        <Grid item lg={2} xs={12} sm={6} md={4}>
          <Typography component="p" noWrap>
            .
          </Typography>
          <Selected label="Statut à tracker" data={statut} value={statValue} setValue={setStatValue} />
        </Grid>
        <Grid item lg={3} xs={12} sm={6} md={4} sx={{ paddingLeft: '10px' }}>
          <Typography component="p" noWrap>
            Importez le fichier all adress
          </Typography>
          <Input type="file" name="upload" id="upload" onChange={(e) => readUploadFile(e, setAllAdress)} />
        </Grid>
        <Grid item lg={3} xs={12} sm={6} md={4} sx={{ paddingLeft: '10px' }}>
          <Typography component="p" noWrap>
            Importez le fichier d&apos;appels sortant
          </Typography>
          <Input type="file" name="upload" id="upload" onChange={(e) => readUploadFile(e, setAppel)} />
        </Grid>
        <Grid item lg={3} xs={12} sm={6} md={6} sx={{ paddingLeft: '10px' }}>
          <Typography component="p" noWrap>
            File to track
          </Typography>
          <Input type="file" name="upload" id="upload" onChange={(e) => readUploadFile(e, setFileToTrack)} />
        </Grid>

        <Grid item lg={1} xs={12} sm={6} md={6} sx={{ paddingLeft: '10px' }}>
          <Typography>.</Typography>
          <Button variant="contained" color="primary" fullWidth onClick={(e) => sendings(e)}>
            <Save fontSize="small" />
          </Button>
        </Grid>
      </Grid>
      {demandeFeedBack && <Table dataToSend={demandeFeedBack} />}
    </>
  );
}

export default AllAdresse;
