// import { Input } from 'antd';
import { Paper, Typography } from '@mui/material';
import { CreateContexteGlobal } from 'GlobalContext';
import React from 'react';
import { useSelector } from 'react-redux';
import Component from './Component';
import Contexte from './Contexte';
import Deroulant from './Deroulant';
import './history.css';

function Index() {
  const menu = useSelector((state) => state.menu.drawerOpen);

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
        { id: 24, title: 'All customer' }
      ]
    }
  ];

  const { socket } = React.useContext(CreateContexteGlobal);
  React.useEffect(() => {
    socket.on('renseigne', (data) => {});
  }, [socket]);

  return (
    <Contexte>
      <Paper elevation={4} className={!menu ? 'papier_drawer' : 'papier_no_drawer'}>
        <Typography component="p" noWrap id="leftContent"></Typography>
        <div style={{ display: 'flex', marginLeft: '10px' }}>
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
