/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext } from 'react';
export const CreateContextDashboard = createContext();

const Context = (props) => {
  const [data, setData] = React.useState();
  const [analyse, setAnalyses] = React.useState([]);
  const setAnalyse = (donner) => {
    setAnalyses(donner);
  };
  return (
    <CreateContextDashboard.Provider
      value={{
        data,
        setData,
        analyse,
        setAnalyse
      }}
    >
      {props.children}
    </CreateContextDashboard.Provider>
  );
};
export default React.memo(Context);
