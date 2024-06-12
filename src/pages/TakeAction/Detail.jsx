import { Save } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { CreateContexteGlobal } from 'GlobalContext';
// import { CreateContexteGlobal } from 'GlobalContext';
import AutoComplement from 'components/AutoComplete';
import DirectionSnack from 'components/Direction';
import TextArea from 'components/TextArea';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';

function Detail({ clientSelect, step }) {
  const [value, setValue] = React.useState('');
  const [areaValue, setAreaValue] = React.useState('');
  const [open, setOpen] = React.useState(true);
  const { socket } = React.useContext(CreateContexteGlobal);
  const [actionSelect, setActionSelect] = React.useState();
  const status = useSelector((state) => state.status?.status);
  const [actionSelectFeedback, setActionSelectFeedback] = React.useState('');

  const returnAction = () => {
    setActionSelect(_.filter(status, { idStatus: clientSelect.status.idStatus })[0]);
  };
  React.useEffect(() => {
    if (status && clientSelect) {
      returnAction();
    }
  }, [clientSelect]);
  const user = useSelector((state) => state.user?.user);

  const send = async (e) => {
    e.preventDefault();
    let data = {
      commentaire: areaValue,
      customer_id: clientSelect?.unique_account_id,
      status: clientSelect?.status,
      role: actionSelect?.roles[0].title,
      codeAgent: user?.codeAgent
    };
    if (clientSelect.status.idStatus === 'SA89AF') {
      let feedback = {
        _idClient: clientSelect._id,
        ancienStatus: clientSelect.status,
        type: 'feedback',
        newStatus: actionSelectFeedback
      };
      data._idClient = feedback._idClient;
      data.ancienStatus = feedback.ancienStatus;
      data.type = 'feedback';
      data.newStatus = feedback.newStatus;
    } else {
      let post = {
        feedbackSelect: value,
        type: 'post'
      };
      data.feedbackSelect = post.feedbackSelect;
      data.type = post.type;
    }
    // const response = await axios.post(lien_post + '/postclient', data, config);
    // console.log(response);
    socket.emit('renseignefeedback', data);
    setAreaValue('');
    setValue('');
    setActionSelectFeedback('');
    step();
  };
  return (
    <Stack>
      <Typography
        component="p"
        style={{ backgroundColor: '#002d72', padding: '5px', margin: '0px', fontSize: '12px', color: 'white', textAlign: 'center' }}
      >
        {clientSelect.status.title}
      </Typography>
      <DirectionSnack open={open} setOpen={setOpen} message="error" />
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
          {status && clientSelect.status.idStatus === 'SA89AF' && (
            <Grid item lg={12} sx={{ marginTop: '10px' }}>
              <AutoComplement
                value={actionSelectFeedback}
                setValue={setActionSelectFeedback}
                options={status}
                title="Statut"
                propr="title"
              />
            </Grid>
          )}
          {clientSelect.status.idStatus !== 'SA89AF' && (
            <div>
              <AutoComplement value={value} setValue={setValue} options={clientSelect?.statusLabel} title="Feedback" propr="title" />
            </div>
          )}

          <div style={{ marginTop: '10px' }}>
            <TextArea setValue={setAreaValue} value={areaValue} placeholder="Commentaire" />
          </div>
          <Button onClick={(e) => send(e)} variant="contained" fullWidth sx={{ marginTop: '10px' }} color="primary">
            <Save fontSize="small" /> <span style={{ marginLeft: '10px' }}>Valier</span>
          </Button>
        </div>
      )}
    </Stack>
  );
}

export default Detail;
