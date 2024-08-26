import { Message, Person, Save } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Postdatatotrack } from 'Redux/dataTotrack';
import axios from 'axios';
import AutoComplement from 'components/AutoComplete';
import Selected from 'components/Selected';
import AutoComplemente from 'pages/Parametre/Etapes/Complement';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lienVisiteMenage } from 'static/Lien';
import Input from './Input';

function Addclient() {
  const par = [
    { id: 2, title: '15', value: 'PAR 15' },
    { id: 3, title: '30', value: 'PAR 30' },
    { id: 4, title: '60', value: 'PAR 60' },
    { id: 5, title: '90', value: 'PAR 90' },
    { id: 6, title: '120', value: 'PAR 120' }
  ];
  const [parSelect, setPar] = React.useState('');
  const [initiale, setInitiale] = React.useState();
  const status = useSelector((state) => state.status?.status);
  const [statusSelect, setStatusSelect] = React.useState('');

  const onchange = (e) => {
    const { name, value } = e.target;
    setInitiale({ ...initiale, [name]: value });
  };
  const [region, setRegion] = React.useState();
  const loadingregion = async () => {
    try {
      const response = await axios.get(lienVisiteMenage + '/zone');
      if (response.status === 200) {
        setRegion(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadingregion();
  }, []);
  const [regionSelect, setRegionSelect] = React.useState('');
  const [shop, setShop] = React.useState('');
  const user = useSelector((state) => state.user?.user);
  console.log(statusSelect);
  const dispatch = useDispatch();

  const sendData = (e) => {
    e.preventDefault();
    const data = {
      unique_account_id: initiale?.unique_account_id,
      customer_name: initiale?.customer_name,
      shop_name: shop?.shop,
      shop_region: regionSelect?.denomination,
      par_to_date: parSelect,
      statusEnCours: statusSelect?.idStatus,
      commentaire: initiale?.commentaire,
      role: user?.roleAgent.title
    };
    dispatch(Postdatatotrack(data));
  };
  return (
    <div style={{ minWidth: '23rem' }}>
      <div style={{ marginBottom: '10px' }}>
        <Input
          label="unique_account_id"
          onChange={(e) => onchange(e)}
          name="unique_account_id"
          value={initiale?.unique_account_id}
          icon={<Person />}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Input label="customer_name" onChange={(e) => onchange(e)} name="customer_name" value={initiale?.customer_name} icon={<Person />} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Input label="commentaire" onChange={(e) => onchange(e)} name="commentaire" value={initiale?.commentaire} icon={<Message />} />
      </div>
      <div>
        {region && <AutoComplement value={regionSelect} setValue={setRegionSelect} title="Region" options={region} propr="denomination" />}
      </div>
      <div style={{ margin: '10px 0px' }}>
        {regionSelect && <AutoComplement value={shop} setValue={setShop} title="Shop" options={regionSelect.shop} propr="shop" />}
      </div>
      <div style={{ margin: '10px 0px' }}>
        <Selected label="Par" data={par} value={parSelect} setValue={setPar} />
      </div>
      {status && (
        <div>
          <AutoComplemente value={statusSelect} setValue={setStatusSelect} options={status} title="Status" />
        </div>
      )}
      <div style={{ marginTop: '10px' }}>
        <Button variant="contained" color="primary" fullWidth onClick={(e) => sendData(e)}>
          <Save fontSize="small" />
          <span style={{ marginLeft: '5px' }}>Valider</span>
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Addclient);
