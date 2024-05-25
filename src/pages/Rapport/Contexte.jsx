/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext } from 'react';

export const CreateContexte = createContext();

const ContexteAnalyse = (props) => {
  const [data, setData] = React.useState();

  const handleData = (index) => {
    setData(index);
  };
  return (
    <CreateContexte.Provider
      value={{
        handleData,
        data
      }}
    >
      {props.children}
    </CreateContexte.Provider>
  );
};
export default React.memo(ContexteAnalyse);
