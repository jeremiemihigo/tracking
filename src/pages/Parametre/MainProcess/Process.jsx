import { Button } from '@mui/material';
import { PostProcess } from 'Redux/Process';
import { EditStatus } from 'Redux/status';
import { Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

function Process(props) {
  const data = props.donner?.data;
  const statut = props.donner?.statut;
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const sendData = (e) => {
    e.preventDefault();
    dispatch(PostProcess({ title: value }));
    setValue('');
  };
  const sendEdit = (e) => {
    e.preventDefault();
    const datas = { donner: { title: value, statut, _id: data._id }, link: 'process' };
    dispatch(EditStatus(datas));
    setValue('');
  };
  React.useEffect(() => {
    if (data) {
      setValue(data.title);
    }
  }, [data]);

  return (
    <div style={{ width: '20rem' }}>
      <div style={{ marginBottom: '10px' }}>
        <Input placeholder="Title" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div>
        <Button color="primary" variant="contained" onClick={data ? (e) => sendEdit(e) : (e) => sendData(e)}>
          Valider
        </Button>
      </div>
    </div>
  );
}

export default Process;
