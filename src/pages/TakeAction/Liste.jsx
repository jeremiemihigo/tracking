/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SearchOutlined } from '@ant-design/icons';
import { FormControl, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { differenceDays } from 'static/Lien';
import { CreateContexte } from './Contexte';

function Liste({ client, action }) {
  const { handleClient, clientSelect } = React.useContext(CreateContexte);
  const [filterFn, setFilterFn] = React.useState({
    fn: (items) => {
      return items;
    }
  });
  const handleChanges = (e) => {
    let target = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (target === '') {
          return items;
        } else {
          return items.filter(
            (x) => x.unique_account_id.includes(target) || x.shop_name.includes(target) || x.shop_region.includes(target)
          );
        }
      }
    });
  };
  return (
    <Grid>
      <FormControl sx={{ width: '100%', marginBottom: '12px' }}>
        <OutlinedInput
          size="small"
          id="header-search"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight'
          }}
          onChange={(e) => handleChanges(e)}
          placeholder="ID, region, shop"
        />
      </FormControl>
      <Table>
        <tbody>
          {client &&
            filterFn.fn(client).map((index) => {
              return (
                <tr key={index._id}>
                  <td onClick={() => handleClient(index)} className={clientSelect && clientSelect._id === index._id ? 'select' : 'blacks'}>
                    <Typography component="p" noWrap sx={{ fontSize: '12px' }}>
                      {index.unique_account_id + ' ; '}
                      {differenceDays(index.updatedAt, new Date()) > action?.delai ? 'OUTSLA' : 'INSLA'}
                    </Typography>
                    <Typography sx={{ fontSize: '10px' }} noWrap>
                      {index?.shop_region}--{index?.shop_name}
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
