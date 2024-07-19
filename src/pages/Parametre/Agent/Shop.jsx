import { Button } from '@mui/material';
import { PutAgent } from 'Redux/agent';
import axios from 'axios';
import AutoComplement from 'components/AutoComplete';
import React from 'react';
import { useDispatch } from 'react-redux';
import { lienVisiteMenage } from 'static/Lien';

function AddShop({ donner }) {
  const [shop, setShop] = React.useState();
  const loadingshop = async () => {
    try {
      const response = await axios.get(lienVisiteMenage + '/shop');
      setShop(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadingshop();
  }, []);
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const sendData = (e) => {
    e.preventDefault();
    let shp = [...donner.shop];
    shp.push(value?.shop);
    let data = {
      id: donner._id,
      status: donner.mystatus,
      shop: shp,
      region: donner.region
    };
    dispatch(PutAgent(data));
  };
  return (
    <div style={{ minWidth: '20rem', paddingTop: '10px' }}>
      {shop && <AutoComplement value={value} setValue={setValue} title="Shop" options={shop} propr="shop" />}
      <div style={{ marginTop: '10px' }}>
        {!shop ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <Button variant="contained" fullWidth color="primary" onClick={(e) => sendData(e)}>
            Send
          </Button>
        )}
      </div>
    </div>
  );
}

export default AddShop;
