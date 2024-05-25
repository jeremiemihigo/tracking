/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext } from 'react';

export const CreateContexte = createContext();

const ContexteDepartement = (props) => {
  const [departement, setDepartement] = React.useState('');

  function handleDepartement(texte) {
    setDepartement(texte);
  }
  return (
    <CreateContexte.Provider
      value={{
        handleDepartement,
        departement
      }}
    >
      {props.children}
    </CreateContexte.Provider>
  );
};
export default React.memo(ContexteDepartement);
