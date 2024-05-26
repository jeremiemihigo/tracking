/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from '../node_modules/react-redux/es/exports';
export const CreateContexteGlobal = createContext();

const ContexteGlobal = (props) => {
  const [socket, setSocket] = React.useState(null);
  const user = useSelector((state) => state?.user.user);
  console.log(user);

  React.useEffect(() => {
    setSocket(io('http://localhost:800'));
  }, []);
  React.useEffect(() => {
    if (socket !== null && user) {
      const data = { codeAgent: user.codeAgent, nom: user.nom };
      socket.emit('newUser', data);
    }
  }, [socket, user]);
  return (
    <CreateContexteGlobal.Provider
      value={{
        socket
      }}
    >
      {props.children}
    </CreateContexteGlobal.Provider>
  );
};
export default React.memo(ContexteGlobal);
