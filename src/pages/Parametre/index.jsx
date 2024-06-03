/* eslint-disable react-hooks/exhaustive-deps */
import { Edit } from '@mui/icons-material';
import { Fab, Tooltip, Typography } from '@mui/material';
import { CreateContexteGlobal } from 'GlobalContext';
import MainCard from 'components/MainCard';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Popup from 'static/Popup';
import Process from './Process';
import AddProcess from './Process/AddProcess';
import './style.css';

function Index() {
  const location = useLocation();
  const id = location.state.id;
  const main = useSelector((state) => state.main?.main);
  const [mainSelect, setMainSelect] = React.useState();
  const [open, setOpen] = React.useState(false);
  const { handleLogout } = React.useContext(CreateContexteGlobal);

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
    if (!id) {
      handleLogout();
    }
  }, [id]);
  return (
    <MainCard title={mainSelect ? mainSelect.title : ''}>
      <div>
        <Tooltip title="Add process">
          <Fab onClick={() => setOpen(true)} size="small" color="primary" sx={{ marginBottom: '10px' }}>
            <Edit fontSize="small" color="inherit" />
          </Fab>
        </Tooltip>
        <Typography component="h4"></Typography>
        {mainSelect && <Process id={mainSelect.idMainProcess} />}
      </div>
      <Popup open={open} setOpen={setOpen} title="Add process">
        <AddProcess />
      </Popup>
    </MainCard>
  );
}

export default Index;
