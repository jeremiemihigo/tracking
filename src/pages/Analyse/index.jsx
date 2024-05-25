// import { Input } from 'antd';
import React from 'react';
import { Paper } from '@mui/material';
// import { config, lien } from 'static/Lien';
// import axios from 'axios';
// import DirectionSnackbar from 'components/Direction';

import './history.css';
import { useSelector } from 'react-redux';
// import MainCard from 'components/MainCard';

import Deroulant from './Deroulant';
import Contexte from './Contexte';
import Component from './Component';

function Index() {
  // const [data, setData] = React.useState();

  // const [message, setMessage] = React.useState();
  // const [open, setOpen] = React.useState(true);

  // const loading = async () => {
  //   try {
  //     const response = await axios.post(lien + '/history', { codeclient }, config);
  //     if (response.status === 201) {
  //       setMessage(response.data);
  //     }
  //     if (response.status === 200) {
  //       setData(response.data);
  //     }
  //   } catch (error) {
  //     setMessage(error?.response?.data);
  //   }
  // };

  // const client = useSelector((state) => state.client.client);

  // React.useEffect(() => {
  //   if (client && client.length > 0) {
  //     setData(client.filter((x) => x.result.length > 0));
  //   }
  // }, [client]);

  const menu = useSelector(state => state.menu.drawerOpen)

  const option = [
    {
      id: 1,
      title: 'Departement',
      child: [
        { id: 11, title: 'Client en attente' },
        { id: 12, title: 'Clients remoted' },
        { id: 13, title: 'Customer Deedline' },
        { id: 14, title: 'Performance' }
      ]
    },
    {
      id: 2,
      title: 'Individually',
      child: [
        { id: 21, title: 'Agent' },
        { id: 22, title: 'Customer' },
        { id: 23, title: 'Statut' },
        { id: 24, title: 'All customer' },
      ]
    }
  ];

  return (
    <Contexte>
      <Paper elevation={4} className={!menu ? "papier_drawer" : "papier_no_drawer"}>
        <p id='leftContent'></p>
        <div style={{display:"flex", marginLeft:"10px"}}>
        {option.map((index) => {
          return (
            <React.Fragment key={index.id}>
              <Deroulant texte={index.title} table={index.child} />
            </React.Fragment>
          );
        })}
        </div>
      </Paper>
      <>
        <Component />
      </>
    </Contexte>
  );
}

export default Index;
