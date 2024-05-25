/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainCard from 'components/MainCard';
import { Edit } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Process from './Process';
import Popup from 'static/Popup';
import AddProcess from './Process/AddProcess';
import './style.css';

function Index() {
  const params = useParams();
  const { id } = params;
  const main = useSelector((state) => state.main?.main);
  const [mainSelect, setMainSelect] = React.useState();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (main && main.length > 0) {
      let donner = main.filter((x) => x._id === id);
      if (donner.length > 0) {
        setMainSelect(donner[0]);
      } else {
        localStorage.removeItem('auth');
        window.location.replace('/tracker/login');
      }
    }
  }, [id]);
  return (
    <MainCard title={mainSelect ? mainSelect.title : ''}>
      <div>
        <Typography component="h4">
          process <Edit onClick={() => setOpen(true)} fontSize="small" color="primary" />
        </Typography>
        {mainSelect && <Process id={mainSelect.idMainProcess} />}
      </div>
      <Popup open={open} setOpen={setOpen} title="Add process">
        <AddProcess />
      </Popup>
    </MainCard>
  );
}

export default Index;
