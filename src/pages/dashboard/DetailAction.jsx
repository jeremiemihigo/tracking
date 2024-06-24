import { Clear } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';

function DetailAction({ data, show, setShow }) {
  const status = useSelector((state) => state.status?.status);
  const [statutSelect, setStatusSelect] = React.useState([]);

  React.useEffect(() => {
    setStatusSelect(_.filter(status, { idStatus: data }));
  }, [data]);
  return (
    <div className={show ? 'detail' : 'detail detailnone'}>
      <div className="removeItem">
        <div className="titre">
          <Typography noWrap>{statutSelect.length > 0 && statutSelect[0].title}</Typography>
        </div>
        <div className="content" onClick={() => setShow(false)}>
          <Clear fontSize="small" />
        </div>
      </div>
      <div>
        <Grid container>
          {data && statutSelect.length > 0 && statutSelect[0]?.instruction && (
            <>
              <div
                style={{
                  backgroundColor: '#002d72',
                  margin: '5px 0px',
                  borderRadius: '3px',
                  width: '100%',
                  color: '#fff',
                  padding: '0px'
                }}
              >
                <p style={{ textAlign: 'center', fontSize: '12px', margin: '0px', padding: '0px', fontWeight: 'bolder' }}>Instruction</p>
              </div>
              {statutSelect && <p style={{ fontSize: '12px', margin: '0px 10px', textAlign: 'justify' }}>{statutSelect[0]?.instruction}</p>}
            </>
          )}
          {data && statutSelect.length > 0 && statutSelect[0].actions.length > 0 && (
            <>
              <div
                style={{ backgroundColor: '#002d72', margin: '5px 0px', borderRadius: '3px', width: '100%', color: '#fff', padding: '0px' }}
              >
                <p style={{ textAlign: 'center', fontSize: '12px', margin: '0px', padding: '0px', fontWeight: 'bolder' }}>Actions</p>
              </div>
              <div style={{ marginLeft: '10px' }}>
                <ol>
                  {statutSelect[0].actions?.map((index, key) => {
                    return (
                      <li style={{ fontSize: '12px' }} key={key}>
                        {index.title}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default DetailAction;
