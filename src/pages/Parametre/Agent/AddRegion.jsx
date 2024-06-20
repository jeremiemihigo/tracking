import { Button } from '@mui/material';
import { PutAgent } from 'Redux/agent';
import axios from 'axios';
import AutoComplement from 'components/AutoComplete';
import React from 'react';
import { useDispatch } from 'react-redux';
import { lienVisiteMenage } from 'static/Lien';

function AddRegion({ donner }) {
  const [region, setRegion] = React.useState();
  const loadingregion = async () => {
    const response = await axios.get(lienVisiteMenage + '/zone');
    setRegion(response.data);
  };
  React.useEffect(() => {
    loadingregion();
  }, []);
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const sendData = (e) => {
    e.preventDefault();
    let regi = [...donner.region];
    regi.push(value?.denomination);
    let data = {
      id: donner._id,
      status: donner.mystatus,
      shop: donner.shop,
      region: regi
    };
    dispatch(PutAgent(data));
  };
  return (
    <div style={{ minWidth: '20rem', paddingTop: '10px' }}>
      {region && <AutoComplement value={value} setValue={setValue} title="Region" options={region} propr="denomination" />}
      <div style={{ marginTop: '10px' }}>
        <Button variant="contained" fullWidth color="primary" onClick={(e) => sendData(e)}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default AddRegion;
