import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, TextField, Button } from '@mui/material';
import AutoComplement from 'components/AutoComplete';
import { Save } from '@mui/icons-material';
import axios from 'axios';
import { lien } from 'static/Lien';

function Par() {
  const shop = useSelector((state) => state.shop?.shop);
  const [shopSelect, setShopSelect] = React.useState('');
  const [initial, setInitial] = React.useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitial({
      ...initial,
      [name]: value
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const response = await axios.post(lien + '/par', { initial, shop: shopSelect?.shop });
    console.log(response);
  };

  return (
    <div>
      {shop && (
        <Grid item lg={12} sx={{ marginTop: '10px' }}>
          <AutoComplement value={shopSelect} setValue={setShopSelect} options={shop} title="Shop" propr="shop" />
        </Grid>
      )}

      <Grid container sx={{ marginTop: '10px' }}>
        <Grid item lg={6} sx={{ paddingRight: '10px' }}>
          <TextField
            name="inferieur_begin"
            onChange={(e) => handleChange(e)}
            placeholder="Par inférieur << De >>"
            type="number"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="inferieur_end"
            onChange={(e) => handleChange(e)}
            placeholder="Par inférieur << jusqu'à >>"
            type="number"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: '10px' }}>
        <Grid item lg={6} sx={{ paddingRight: '10px' }}>
          <TextField
            name="superieur_begin"
            onChange={(e) => handleChange(e)}
            type="number"
            placeholder="Par supérieur << De >>"
            fullWidth
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="superieur_end"
            onChange={(e) => handleChange(e)}
            type="number"
            placeholder="Par supérieur << jusqu'à >>"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid sx={{ marginTop: '10px' }}>
        <Button color="primary" variant="contained" onClick={(e) => sendData(e)}>
          <Save fontSize="small" />
        </Button>
      </Grid>
    </div>
  );
}

export default Par;
