import { Save } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { CreateContexteGlobal } from 'GlobalContext';
import AutoComplement from 'components/AutoComplete';
import DirectionSnack from 'components/Direction';
import MainCard from 'components/MainCard';
import TextArea from 'components/TextArea';
import React from 'react';
import { CreateContexte } from './Contexte';

function Detail({ action }) {
  const { clientSelect, handleClient } = React.useContext(CreateContexte);
  const [value, setValue] = React.useState('');
  const [areaValue, setAreaValue] = React.useState('');
  const [open, setOpen] = React.useState(true);
  const { socket } = React.useContext(CreateContexteGlobal);

  const send = async (e) => {
    e.preventDefault();
    let data = {
      feedbackSelect: value,
      commentaire: areaValue,
      type: 'post',
      customer_id: clientSelect?.unique_account_id,
      status: action?.status?.title,
      role: action?.roles[0].title,
      dateDebut: clientSelect?.updatedAt,
      action
    };
    socket.emit('renseignefeedback', data);
    setAreaValue('');
    setValue('');
    handleClient(undefined);
  };
  return (
    <Stack>
      <DirectionSnack open={open} setOpen={setOpen} message="error" />
      {clientSelect && (
        <MainCard
          title={
            <>
              <p>Action : {clientSelect.action?.title}</p>
              {clientSelect.action?.objectif && (
                <Typography variant="h6" color="primary">
                  But : {clientSelect.action?.objectif}
                </Typography>
              )}

              <p>
                ID : {clientSelect?.unique_account_id} ; {clientSelect?.customer_name}
              </p>
            </>
          }
        >
          <div>
            <AutoComplement value={value} setValue={setValue} options={clientSelect?.statutaction} title="Feedback" propr="title" />
          </div>

          <div style={{ marginTop: '10px' }}>
            <TextArea setValue={setAreaValue} value={areaValue} placeholder="Commentaire" />
          </div>
          <Button onClick={(e) => send(e)} variant="contained" fullWidth sx={{ marginTop: '10px' }} color="primary">
            <Save fontSize="small" /> <span style={{ marginLeft: '10px' }}>Valier</span>
          </Button>
        </MainCard>
      )}
    </Stack>
  );
}

export default Detail;
