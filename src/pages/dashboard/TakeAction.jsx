import { Grid, Paper } from '@mui/material';
import Detail from 'pages/TakeAction/Detail';
import Result from 'pages/TakeAction/Result';
import React from 'react';

function TakeAction({ data, step }) {
  return (
    <Grid container>
      <Grid item lg={5}>
        <Paper elevation={2}>
          <Detail clientSelect={data} step={step} />
        </Paper>
      </Grid>
      <Grid item lg={7} sx={{ paddingLeft: '15px' }}>
        <Grid className="resultTable">
          {data && data.result.length > 0 ? (
            data.result.reverse().map((index) => {
              return (
                <React.Fragment key={index._id}>
                  <Result index={index} />
                </React.Fragment>
              );
            })
          ) : (
            <p style={{ textAlign: 'center' }}>Until now there is no action for this customer</p>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TakeAction;
