import React from 'react';
import ClientAttente from './ClientAttente';
import { CreateContexte } from './Contexte';
import DeedLine from './DeedLine';
import AgentRemoted from './AgentRemoted';
import Customer from './Customer';
import Statut from './Statut';
import AllCustomer from './AllCustomer';

function Component() {
  const { optionSelect } = React.useContext(CreateContexte);
  return (
    <div style={{ marginTop: '20px' }}>
      {optionSelect && optionSelect.id === 11 && <ClientAttente />}
      {optionSelect && optionSelect.id === 13 && <DeedLine />}
      {optionSelect && optionSelect.id === 21 && <AgentRemoted />}
      {optionSelect && optionSelect.id === 22 && <Customer />}
      {optionSelect && optionSelect.id === 24 && <AllCustomer />}
      {optionSelect && optionSelect.id === 23 && <Statut />}
    </div>
  );
}

export default Component;
