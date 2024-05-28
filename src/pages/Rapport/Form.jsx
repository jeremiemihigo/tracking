import { Search } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { Input } from 'antd';
import AutoComplement from 'components/AutoComplete';
import ExcelButton from 'components/Excel';
import React from 'react';
import { useSelector } from 'react-redux';
import { config, lien_post } from 'static/Lien';
import axios from '../../../node_modules/axios/index';
import { CreateContexte } from './Contexte';

function Form({ setDateSelect, dateSelect }) {
  const roles = useSelector((state) => state.role?.role);
  const [roleSelect, setRoleSelect] = React.useState('');

  const { handleData, data } = React.useContext(CreateContexte);

  const handleChangeDate = (event) => {
    const { name, value } = event.target;
    setDateSelect({
      ...dateSelect,
      [name]: value
    });
  };
  const [step, setStep] = React.useState('');
  const sendRecherche = async (e) => {
    try {
      setStep('loading...');
      e.preventDefault();
      const data = {
        debut: dateSelect?.debut,
        fin: dateSelect?.fin,
        role: roleSelect === null || roleSelect === '' ? 'overall' : roleSelect?.title
      };
      const response = await axios.post(lien_post + '/rapport', data, config);
      if (response.status === 200) {
        handleData(response.data);
        setStep('');
      }
    } catch (error) {
      console.log(error);
      setStep('error');
    }
  };
  return (
    <div style={{ width: '30rem' }}>
      <Grid container>
        <Grid item lg={6} xs={12} sm={6} md={6} sx={{ padding: '2px' }}>
          <Input placeholder="Allant du" name="debut" onChange={(e) => handleChangeDate(e)} type="date" />
        </Grid>
        <Grid item lg={6} xs={12} sm={6} md={6} sx={{ padding: '2px' }}>
          <Input placeholder="Au" name="fin" onChange={(e) => handleChangeDate(e)} type="date" />
        </Grid>
        <Grid item lg={6} xs={12} sm={6} md={6} sx={{ padding: '2px', marginTop: '8px' }}>
          <AutoComplement value={roleSelect} setValue={setRoleSelect} options={roles} title="Role" propr="title" />
        </Grid>
        <Grid
          item
          lg={3}
          xs={6}
          sm={3}
          md={3}
          sx={{ padding: '2px', display: 'flex', marginTop: '8px', alignItems: 'center', justifyContent: 'center' }}
        >
          {step !== '' ? (
            step
          ) : (
            <Button fullWidth onClick={(e) => sendRecherche(e)} color="primary" variant="contained">
              <Search fontSize="small" />
            </Button>
          )}
        </Grid>
        {data && data.length > 0 && (
          <Grid
            item
            lg={3}
            xs={6}
            sm={3}
            md={3}
            sx={{ padding: '2px', display: 'flex', marginTop: '8px', alignItems: 'center', justifyContent: 'center' }}
          >
            <ExcelButton data={data} fileName={`Actions du ${dateSelect.debut} au ${dateSelect.fin}`} title="Excel" sheetName="Actions" />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Form;
