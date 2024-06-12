import { Button } from '@mui/material';
import { Postaction } from 'Redux/action';
import { Input } from 'antd';
import AutoComplement from 'components/AutoComplete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Process() {
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
  return (
    <div style={{ width: '20rem' }}>
      <div style={{ margin: '10px 0px' }}>
        {status && <AutoComplement value={valueSelect} setValue={setValueSelect} options={status} title="Select Status" propr="title" />}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Input placeholder="Title" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div>
        <Button color="primary" variant="contained" onClick={(e) => sendData(e)}>
          Valider
        </Button>
      </div>
    </div>
  );
}

export default Process;
