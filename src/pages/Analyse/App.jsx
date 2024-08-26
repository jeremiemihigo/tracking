// import { Input } from 'antd';
import { Paper, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Component from './Component';
import { CreateContexte } from './Contexte';
import Deroulant from './Deroulant';
import './history.css';

function Index() {
  const menu = useSelector((state) => state.menu.drawerOpen);

  const option = [
    {
      id: 2,
      title: 'Individually',
      child: [
        { id: 23, title: 'Statut' },
        { id: 24, title: 'Monitoring' },
        { id: 25, title: 'Role' }
      ]
    }
  ];
  const { title } = React.useContext(CreateContexte);
  return (
    <>
      <Paper elevation={4} className={!menu ? 'papier_drawer' : 'papier_no_drawer'}>
        <Typography component="p" noWrap>
          {title}
        </Typography>
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
    </>
  );
}

export default Index;
