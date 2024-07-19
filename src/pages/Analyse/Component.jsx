import React from 'react';
import AllCustomer from './AllCustomer';
import { CreateContexte } from './Contexte';
import Statut from './Statut';

function Component() {
  const { optionSelect } = React.useContext(CreateContexte);
  return (
    <div style={{ marginTop: '20px' }}>
      {optionSelect && optionSelect.id === 23 && <Statut />}
      {optionSelect && optionSelect.id === 24 && <AllCustomer />}
    </div>
  );
}

export default Component;
