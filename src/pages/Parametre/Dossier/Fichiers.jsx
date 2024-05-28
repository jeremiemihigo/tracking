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

  const formatedNumero = (numero) => {
    if (numero.length > 0) {
      if (numero.length === 12) {
        return numero;
      }
      if (numero.length === 13) {
        return Array.from(numero).slice(1).join('');
      }
      if (numero.length === 9) {
        return '243' + numero;
      }
      if (numero.length === 10) {
        return '243' + Array.from(numero).slice(1).join('');
      }
    }
  };

  const searchCode = (numero) => {
    if (_.filter(allAdresse, { customer_phone_1: formatedNumero(numero) }).length > 0) {
      return _.filter(allAdresse, { customer_phone_1: formatedNumero(numero) })[0]['unique_account_id'];
    }
    if (_.filter(allAdresse, { customer_phone_2: formatedNumero(numero) }).length > 0) {
      return _.filter(allAdresse, { customer_phone_1: formatedNumero(numero) })[0]['unique_account_id'];
    }
  };

  const functionAppelSortant = () => {
    if (allAdresse && appel && appel.length > 0) {
      let table = [];
      for (let i = 0; i < appel.length; i++) {
        if (appel[i].Type === 'outbound') {
          table.push({
            UniqueID: appel[i]['UniqueID'],
            unique_account_id: searchCode(appel[i]['Destination']),
            Source: appel[i]['Source'],
            Destination: appel[i]['Destination'],
            feedback: appel[i]['Feedback'],
            StartTime: appel[i]['StartTime'],
            EndTime: appel[i]['EndTime'],
            Duration: appel[i]['Duration'],
            Disposition: appel[i]['Disposition'],
            appel: true
          });
        }
      }
      setAppelSortant(table);
    }
  };

  React.useEffect(() => {
    functionAppelSortant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAdresse, appel]);
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
          called: _.filter(appelSortant, { unique_account_id: track[i]['unique_account_id'] })
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
  };
  React.useEffect(() => {
    loadingVisites();
  }, []);

  const sendings = (e) => {
    e.preventDefault();
    if (loadVisites.bool) {
      sendData({ donner: demandeFeedBack, title: 'Feedback', lien: lien_post + '/client' });
    } else {
      success(loadVisites.message, 'error');
    }
  };
  const statut = [
    { id: 1, title: 'Normal', value: 'normal' },
    { id: 2, title: 'Expired', value: 'late' },
    { id: 2, title: 'Defaulted', value: 'default' }
  ];
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