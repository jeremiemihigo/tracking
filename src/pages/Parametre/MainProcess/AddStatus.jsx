/* eslint-disable react/prop-types */
import { Button, TextField } from '@mui/material';
import { Poststatus, Putstatus } from 'Redux/status';
import { message } from 'antd';
import AutoComplement from 'components/AutoComplete';
import DirectionSnackbar from 'components/Direction';
import TextArea from 'components/TextArea';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddStatus({ edit }) {
  const [texte, setTexte] = React.useState('');
  const [delai, setDelai] = React.useState(1);
  const dispatch = useDispatch();

  const role = useSelector((state) => state.role?.role);
  const process = useSelector((state) => state.process?.process);
  const [processSelect, setProcessSelect] = React.useState('');

  const [valueSelect, setValueSelect] = React.useState('');
  const [objectif, setObjectif] = React.useState('');

  const sendAction = (e) => {
    e.preventDefault();
    let data = {
      title: texte,
      idProcess: processSelect.idProcess,
      role: valueSelect?.id,
      sla: delai,
      instruction: objectif
    };
    //idStatus, title, idRole, delai
    dispatch(Poststatus(data));
    setTexte('');
    setValueSelect('');
    setDelai('');
    setObjectif('');
    setProcessSelect('');
  };

  React.useEffect(() => {
    if (edit) {
      setObjectif(edit?.instruction);
      setTexte(edit?.title);
      setDelai(edit?.sla);
      setValueSelect(edit?.roles[0]);
      setProcessSelect(edit?.process);
    }
  }, [edit]);

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 5
    });
  };

  const editProcess = () => {
    let data = {
      title: texte,
      idProcess: processSelect.idProcess,
      role: valueSelect?.id,
      sla: delai,
      instruction: objectif,
      id: edit._id
    };
    dispatch(Putstatus(data));
  };
  const status = useSelector((state) => state.status);
  const [opensnack, setopensnack] = React.useState(true);

  return (
    <div style={{ width: '30rem' }}>
      {status.putstatus === 'success' && <DirectionSnackbar message="Status saved" open={opensnack} setOpen={setopensnack} />}
      {status.putstatus === 'rejected' && <DirectionSnackbar message={status.putstatusError} open={opensnack} setOpen={setopensnack} />}
      {status.poststatus === 'rejected' && <DirectionSnackbar message={status.poststatusError} open={opensnack} setOpen={setopensnack} />}
      {status.poststatus === 'success' && <DirectionSnackbar message="Status saved" open={opensnack} setOpen={setopensnack} />}

      {contextHolder}
      <div style={{ marginTop: '10px' }}>
        {role && <AutoComplement value={valueSelect} setValue={setValueSelect} options={role} title="Select Role" propr="title" />}
      </div>
      <div style={{ marginTop: '10px' }}>
        {process && (
          <AutoComplement value={processSelect} setValue={setProcessSelect} options={process} title="Select Process" propr="title" />
        )}
      </div>
      <div style={{ margin: '10px 0px' }}>
        <TextField variant="outlined" fullWidth onChange={(e) => setTexte(e.target.value)} value={texte} placeholder="Ajoutez un Status" />
      </div>
      <div style={{ margin: '10px 0px' }}>
        <TextField fullWidth onChange={(e) => setDelai(e.target.value)} type="number" value={delai} placeholder="Délai" />
      </div>
      <div style={{ margin: '10px 0px' }}>
        <TextArea setValue={setObjectif} value={objectif} placeholder="Instruction" />
      </div>

      <div>
        <Button
          disabled={status.poststatus === 'pending' || status.putstatus === 'pending' ? true : false}
          onClick={edit ? (e) => editProcess(e) : (e) => sendAction(e)}
          color="primary"
          variant="contained"
        >
          {edit ? 'Edit' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}
export default AddStatus;
