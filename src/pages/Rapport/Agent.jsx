import _ from 'lodash';
import React from 'react';
import { Grid, Paper, Typography } from '../../../node_modules/@mui/material/index';
import moment from '../../../node_modules/moment/moment';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
import { CreateContexte } from './Contexte';

function Agent() {
  const { data } = React.useContext(CreateContexte);
  const [agentCode, setAgentCode] = React.useState();
  const agentAdmin = useSelector((state) => state.agent?.agent);

  const returnAgent = (id) => {
    if (agentAdmin && agentAdmin.length > 0) {
      return _.filter(agentAdmin, { codeAgent: id })[0]?.nom;
    }
  };
  const returnLastupdate = (id) => {
    if (data && data.length > 0) {
      let donnerAgent = _.filter(data, { codeAgent: id });
      return donnerAgent[donnerAgent.length - 1]['dateFin'];
    } else {
      return '';
    }
  };
  const analyse = () => {
    setAgentCode(Object.keys(_.groupBy(data, 'codeAgent')));
  };
  React.useEffect(() => {
    if (data && data.length > 0) {
      analyse();
    }
  }, [data]);
  return (
    <div>
      <Grid container>
        {agentCode &&
          agentCode.map((index, key) => {
            return (
              <Paper key={key} sx={{ padding: '5px', marginBottom: '6px', width: '100%' }}>
                <Grid className="titleStatut">
                  <Typography noWrap component="p">
                    {returnAgent(index)}
                  </Typography>
                </Grid>
                <Grid className="role">
                  <Typography component="p" className="lastTexte">
                    last update
                  </Typography>
                  <Grid noWrap className="lastContent">
                    <Typography component="p">
                      {returnLastupdate(index) !== '' && new Date(returnLastupdate(index)).toDateString()};
                    </Typography>
                    <Typography component="p" style={{ textAlign: 'right' }}>
                      {returnLastupdate(index) !== '' && moment(returnLastupdate(index)).fromNow()}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
      </Grid>
    </div>
  );
}

export default Agent;
