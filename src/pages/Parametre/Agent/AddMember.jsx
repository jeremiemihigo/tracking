import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Postagent } from 'Redux/agent';
import { Input } from 'antd';
import AutoComplement from 'components/AutoComplete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lienVisiteMenage } from 'static/Lien';
import axios from '../../../../node_modules/axios/index';

function AddMember() {
  const [value, setValue] = React.useState('');
  const [roleSelect, setRoleSelect] = React.useState('');
  const role = useSelector((state) => state.role?.role);

  const [code, setCode] = React.useState('');
  const dispatch = useDispatch();

  const [shopRegion, setShopRegion] = React.useState('');

  const [listeRegion, setListeRegion] = React.useState('');
  const [loadRegion, setLoadRegion] = React.useState(false);

  const [shopListe, setShopListe] = React.useState('');
  const [loadShop, setLoaShop] = React.useState(false);

  const loadingRegion = async () => {
    try {
      setLoadRegion(true);
      const response = await axios.get(lienVisiteMenage + '/zone');
      setListeRegion(response.data);
      setLoadRegion(false);
    } catch (error) {
      console.log(error);
      setLoadRegion(false);
    }
  };
  const loadingShop = async () => {
    try {
      setLoaShop(true);
      const response = await axios.get(lienVisiteMenage + '/shop');
      setShopListe(response.data);
      setLoaShop(false);
    } catch (error) {
      console.log(error);
      setLoaShop(false);
    }
  };
  React.useEffect(() => {
    setListeRegion('');
    setLoadRegion(false);
    setShopListe('');
    setLoaShop(false);
    setShopRegion('');

    if (roleSelect && (roleSelect?.title === 'ZBM' || roleSelect?.title === 'PROCESS OFFICER')) {
      loadingRegion();
    }
    if (roleSelect && (roleSelect?.title === 'SHOP MANAGER' || roleSelect?.title === 'RS')) {
      loadingShop();
    }
  }, [roleSelect]);
  const sendData = (e) => {
    e.preventDefault();
    //nom, code, idShop
    let shop = ['SHOP MANAGER', 'RS'].includes(roleSelect.title) && shopRegion?.shop;
    let region = ['ZBM', 'PROCESS OFFICER'].includes(roleSelect.title) && shopRegion?.denomination;
    const data = { nom: value, code, roleSelect, region, shop };
    dispatch(Postagent(data));
    setCode('');
    setValue('');
  };
  return (
    <div style={{ width: '20rem', marginTop: '10px' }}>
      <div>
        {role && role.length > 0 && (
          <AutoComplement value={roleSelect} setValue={setRoleSelect} options={role} title="Selectionnez un Role" propr="title" />
        )}
      </div>
      {loadRegion ? (
        <p style={{ fontSize: '12px', textAlign: 'center' }}>Loading region...</p>
      ) : (
        listeRegion &&
        listeRegion.length > 0 && (
          <div style={{ margin: '10px 0px' }}>
            <AutoComplement
              value={shopRegion}
              setValue={setShopRegion}
              options={listeRegion}
              title="Selectionnez la region"
              propr="denomination"
            />
          </div>
        )
      )}
      {loadShop ? (
        <p style={{ fontSize: '12px', textAlign: 'center' }}>Loading shop...</p>
      ) : (
        shopListe &&
        shopListe.length > 0 && (
          <div style={{ margin: '10px 0px' }}>
            <AutoComplement value={shopRegion} setValue={setShopRegion} options={shopListe} title="Selectionnez un Shop" propr="shop" />
          </div>
        )
      )}

      <div style={{ margin: '10px 0px' }}>
        <Input placeholder="Agent" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div style={{ margin: '10px 0px' }}>
        <Input placeholder="Code agent" value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div>
        <Button variant="contained" onClick={(e) => sendData(e)} color="primary" fullWidth>
          <Add fontSize="small" /> Ajouter
        </Button>
      </div>
    </div>
  );
}

export default AddMember;
