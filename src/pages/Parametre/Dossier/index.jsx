import React from 'react';
import MainCard from 'components/MainCard';
import Fichiers from './Fichiers';
import Context from './Context';
import Table from './Table';

function Index() {
  return (
    <Context>
      <MainCard title={`Import the file .xlsx >>`} sx={{position:"relative"}}>
        <Fichiers />
        <Table />
      </MainCard>
    </Context>
  );
}

export default Index;
