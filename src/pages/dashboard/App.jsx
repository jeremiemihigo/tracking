import Box from '@mui/material/Box';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.css';
import { CreateContexteGlobal } from 'GlobalContext';
import axios from 'axios';
import Tabs from 'components/Tabs';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { config, lien_readclient } from 'static/Lien';
import { CreateContextDashboard } from './Context';
import Dashoard from './Dashboard';
import TakeAction from './TabAction';
import './style.css';

function TextMobileStepper() {
  const titres = [
    { id: 0, label: 'Dashboard' },
    { id: 1, label: 'Status' }
  ];
  const component = [
    { id: 0, component: <Dashoard /> },
    { id: 1, component: <TakeAction /> }
  ];
  const user = useSelector((state) => state.user?.user);
  const { setAnalyse, setData, data } = React.useContext(CreateContextDashboard);
  const { socket, handleLogout } = React.useContext(CreateContexteGlobal);

  const loadingClient = async () => {
    try {
      const link = user.fonctio[0]?.link;
      const response = await axios.get(`${lien_readclient}/${link}`, config);
      if (response.status === 200) {
        setData(response.data);
      } else {
        if (response.data === 'token expired') {
          handleLogout();
        }
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadingClient();
  }, []);

  const [datasubmit, setDataSubmit] = React.useState();

  const structuration = () => {
    if (data && data.length > 0) {
      let groupe = _.groupBy(data, 'status.idStatus');
      let key = Object.keys(groupe);
      let table = [];
      for (let i = 0; i < key.length; i++) {
        table.push({
          action: key[i],
          visites: groupe['' + key[i]]
        });
      }
      setAnalyse(table);
    }
  };
  React.useEffect(() => {
    structuration();
  }, [data]);

  React.useEffect(() => {
    socket.on('renseigne', (donner) => {
      setDataSubmit(donner);
    });
  }, [socket]);
  React.useEffect(() => {
    if (datasubmit && datasubmit.error === 'success') {
      if (user.mystatus?.includes(datasubmit.content[0].statusEnCours)) {
        let exite = _.filter(data, { _id: datasubmit.content[0]._id });
        if (exite.length > 0) {
          const content = datasubmit.content[0];
          let normal = data.map((x) => (x._id === datasubmit.content[0]._id ? content : x));
          setData(normal);
        } else {
          let d = data;
          d.push(datasubmit.content[0]);
          setData(d);
          structuration();
        }
      } else {
        let normal = data.filter((x) => x._id !== datasubmit.content[0]._id);
        setData(normal);
        structuration();
      }
    }
  }, [datasubmit]);

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <Tabs titres={titres} components={component} />
    </Box>
  );
}
export default TextMobileStepper;
