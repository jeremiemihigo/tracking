/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Typography, Grid } from '@mui/material';
import { differenceDays } from 'static/Lien';
import { CreateContexte } from './Contexte';
import Table from 'react-bootstrap/Table';

function Liste({ client }) {
  const { handleClient, clientSelect } = React.useContext(CreateContexte);
  return (
    <Grid>
      <Table>
        <tbody>
          {client &&
            client.map((index) => {
              return (
                <tr key={index._id}>
                  <td onClick={() => handleClient(index)} className={clientSelect && clientSelect._id === index._id ? 'select' : 'blacks'}>
                    <Typography component="p" noWrap sx={{ fontSize: '12px' }}>
                      {index.unique_account_id + ' ; '}
                      {differenceDays(index.updatedAt, new Date()) > index.action?.delai ? 'OUTSLA' : 'INSLA'}
                    </Typography>
                    <Typography sx={{ fontSize: '12px' }} noWrap>
                      {index.action?.title}
                    </Typography>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Grid>
  );
}

export default Liste;
