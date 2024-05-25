/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext } from 'react';

export const CreateContexte = createContext();

const ContexteClient = (props) => {
  const [clientSelect, setClientSelect] = React.useState();

  const handleClient = (texte) => {
    setClientSelect(texte);
  };
  return (
    <CreateContexte.Provider
      value={{
        handleClient: handleClient,
        clientSelect
      }}
    >
      <div style={{background:"#fff", height:"100vh"}}>
      {props.children}
      </div>
    </CreateContexte.Provider>
  );
};
export default React.memo(ContexteClient);
