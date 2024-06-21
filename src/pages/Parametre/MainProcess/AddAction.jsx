import { Button } from '@mui/material';
import { Postaction } from 'Redux/action';
import { EditStatus } from 'Redux/status';
import { Input } from 'antd';
import AutoComplement from 'components/AutoComplete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '../../../../node_modules/@mui/icons-material/index';

function AddAction(props) {
  const data = props.donner?.data;
  const statut = props.donner?.statut;
  const [value, setValue] = React.useState('');
  const status = useSelector((state) => state.status?.status);
  const [valueSelect, setValueSelect] = React.useState('');
  const dispatch = useDispatch();
  const sendData = (e) => {
    e.preventDefault();
    dispatch(Postaction({ title: value, idStatus: valueSelect?.idStatus }));
    setValue('');
    setValueSelect('');
  };
  const sendUpdate = (e) => {
    e.preventDefault();
    const datas = { donner: { title: value, statut, idStatus: valueSelect?.idStatus, id: data._id }, link: 'action' };
    dispatch(EditStatus(datas));
    setValue('');
    setValueSelect('');
  };

  React.useEffect(() => {
    if (data) {
      setValue(data.title);
      let v = status.filter((x) => x.idStatus === data.idStatus);
      if (v.length === 1) {
        setValueSelect(v[0]);
      }
    }
  }, [data]);

  const deleteAction = (e) => {
    e.preventDefault();
    const datas = { donner: { idAction: data._id, statut }, link: 'deleteaction' };
    dispatch(EditStatus(datas));
  };
  return (
    <div style={{ width: '20rem' }}>
      <div style={{ margin: '10px 0px' }}>
        {status && <AutoComplement value={valueSelect} setValue={setValueSelect} options={status} title="Select Status" propr="title" />}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Input placeholder="Title" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div>
        <Button color="primary" variant="contained" onClick={data ? (e) => sendUpdate(e) : (e) => sendData(e)}>
          {data ? 'Edit' : 'Valider'}
        </Button>
        {data && (
          <Button color="error" variant="contained" sx={{ marginLeft: '10px' }} onClick={(e) => deleteAction(e)}>
            <Delete />
          </Button>
        )}
      </div>
    </div>
  );
}

export default AddAction;
