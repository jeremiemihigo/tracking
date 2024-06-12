import MainCard from 'components/MainCard';
import React from 'react';
import { useSelector } from 'react-redux';
import Popup from 'static/Popup';
import AddAction from './AddAction';
import AddStatus from './AddStatus';
import Process from './Process';
import Table from './Table';

const MainProcess = () => {
  const status = useSelector((state) => state.status?.status);
  const [open, setOpen] = React.useState(false);
  const [openstatus, setOpenStatus] = React.useState(false);
  const [openaction, setOpenaction] = React.useState(false);

  return (
    <MainCard>
      <Table status={status} openProcess={setOpen} addstatus={setOpenStatus} addaction={setOpenaction} />
      <Popup open={open} setOpen={setOpen} title="Process">
        <Process />
      </Popup>
      <Popup open={openstatus} setOpen={setOpenStatus} title="Status">
        <AddStatus />
      </Popup>
      <Popup open={openaction} setOpen={setOpenaction} title="Status Label">
        <AddAction />
      </Popup>
    </MainCard>
  );
};

export default MainProcess;
