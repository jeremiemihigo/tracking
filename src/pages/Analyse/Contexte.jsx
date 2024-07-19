/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext } from 'react';

export const CreateContexte = createContext();

const ContexteAnalyse = (props) => {
  const [optionSelect, setOptionSelect] = React.useState({ id: 24, title: 'Monitoring' });

  const handleOption = (texte) => {
    setOptionSelect(texte);
  };
  const [title, setTitle] = React.useState('');
  return (
    <CreateContexte.Provider
      value={{
        handleSelect: handleOption,
        optionSelect,
        title,
        setTitle
      }}
    >
      {props.children}
    </CreateContexte.Provider>
  );
};
export default React.memo(ContexteAnalyse);
