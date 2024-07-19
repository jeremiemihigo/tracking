import { Save } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { default as DirectionSnackbar } from 'components/Direction';
import TextArea from 'components/TextArea';
import _ from 'lodash';
import AutoComplement from 'pages/Parametre/Etapes/Complement';
import React from 'react';
import { useSelector } from 'react-redux';
import { config, lien_post } from 'static/Lien';

function Detail({ clientSelect, step }) {
  const [statusOne, setStatusSelectOne] = React.useState('');
  const [areaValue, setAreaValue] = React.useState('');
  const [actionSelect, setActionSelect] = React.useState();
  const status = useSelector((state) => state.status?.status);
  const returnAction = () => {
    setActionSelect(_.filter(status, { idStatus: clientSelect.status.idStatus })[0]);
  };
  React.useEffect(() => {
    if (status && clientSelect) {
      returnAction();
    }
  }, [clientSelect]);

  const user = useSelector((state) => state.user?.user);
  const [erreur, setErreur] = React.useState('');
  const [openErreur, setOpenErreur] = React.useState(true);

  const reset = () => {
    setAreaValue('');
    step(0);
  };
  const [sending, setSending] = React.useState(false);

  const send = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      setErreur('');
      let data = {
        commentaire: areaValue,
        customer_id: clientSelect?.unique_account_id,
        status: clientSelect?.status,
        role: actionSelect?.roles[0].title,
        codeAgent: user?.codeAgent,
        feedbackSelect: statusOne?.idStatus,
        titleFeedback: statusOne?.title
      };

      const response = await axios.post(lien_post + '/postclient', data, config);
      setSending(false);
      if (response.status === 200) {
        setErreur(response.data);
        reset();
      }
      if (response.status === 201) {
        setErreur(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack>
      {erreur !== '' && <DirectionSnackbar open={openErreur} setOpen={setOpenErreur} message={erreur} />}
      <Typography
        component="p"
        style={{ backgroundColor: '#002d72', padding: '5px', margin: '0px', fontSize: '12px', color: 'white', textAlign: 'center' }}
      >
        {clientSelect.status.title}
      </Typography>
      {clientSelect && (
        <div style={{ padding: '10px' }}>
          <p style={{ padding: '0px', margin: '0px' }}>{clientSelect?.unique_account_id + ' ; ' + clientSelect?.customer_name}</p>
          {clientSelect.action?.objectif && (
            <Typography variant="h6" color="primary">
              {clientSelect.status?.instruction}
            </Typography>
          )}
          <ol>
            <li style={{ fontSize: '11px' }}>ID agent : {clientSelect?.objectVisite?.codeAgent}</li>
            <li style={{ fontSize: '11px' }}>ID visite : {clientSelect?.objectVisite?.idDemande}</li>
            <li style={{ fontSize: '11px' }}>Feedback : {clientSelect?.objectVisite?.raison}</li>
            <li style={{ fontSize: '11px' }}>Date : {clientSelect?.objectVisite?.dateSave}</li>
          </ol>

          <p style={{ fontSize: '12px', padding: '0px', margin: '0px' }}>
            Called :{' '}
            {!clientSelect.called || clientSelect?.called === 'nCalled' ? (
              <span
                style={{
                  color: 'green'
                }}
              >
                pending feedback
              </span>
            ) : (
              clientSelect?.called
            )}{' '}
          </p>

          {status && (
            <Grid item lg={12} sx={{ marginTop: '10px' }}>
              <AutoComplement value={statusOne} setValue={setStatusSelectOne} options={status} title="Status" />
            </Grid>
          )}
          <div style={{ marginTop: '10px' }}>
            <TextArea setValue={setAreaValue} value={areaValue} placeholder="Commentaire" />
          </div>
          <Button disabled={sending} onClick={(e) => send(e)} variant="contained" fullWidth sx={{ marginTop: '10px' }} color="primary">
            <Save fontSize="small" /> <span style={{ marginLeft: '10px' }}>Valier</span>
          </Button>
        </div>
      )}
    </Stack>
  );
}

export default Detail;
