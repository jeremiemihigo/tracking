import MainCard from 'components/MainCard';
import React from 'react';
import Popup from 'static/Popup';
import { CreateContexte } from './Context';

function Index() {
  const [open, setOpen] = React.useState(false);
  const { departement } = React.useContext(CreateContexte);
  return (
    <MainCard title={departement?.title} sx={{ position: 'relative' }}>
      <Popup open={open} setOpen={setOpen} title="Ajoutez un agent">
        {/* <AddMember /> */}
      </Popup>
    </MainCard>
  );
}

export default Index;
