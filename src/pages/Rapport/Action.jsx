import Dot from 'components/@extended/Dot';
import _ from 'lodash';
import React from 'react';
import { sla } from 'static/Lien';
import { Grid, Paper, Typography } from '../../../node_modules/@mui/material/index';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
import { CreateContexte } from './Contexte';

function Action() {
  const { data } = React.useContext(CreateContexte);
  const [action, setAction] = React.useState();
  const analyse = () => {
    setAction(Object.keys(_.groupBy(data, 'action')));
  };
  const vraiAction = useSelector((state) => state.action?.action);

  React.useEffect(() => {
    if (data) {
      analyse();
    }
  }, [data]);

  const returnSla = (item, type) => {
    if (data && data.length > 0) {
      let dataStatu = _.filter(data, { action: item });
      return ((dataStatu.filter((x) => sla(x) === type).length * 100) / dataStatu.length).toFixed(0) + '%';
    }
  };
  const returnRole = (item) => {
    if (_.filter(vraiAction, { title: item })[0]?.roles.length > 0) {
      return _.filter(vraiAction, { title: item })[0]?.roles[0].title;
    } else {
      return '';
    }
  };
  return (
    <div>
      <Grid container>
        {action &&
          action.map((index, key) => {
            return (
              <Paper key={key} sx={{ padding: '5px', marginBottom: '6px', width: '100%' }}>
                <Grid className="titleStatut">
                  <Typography noWrap component="p">
                    {index}
                  </Typography>
                </Grid>
                <Grid className="allgrid">
                  <Grid className="statutAction">
                    <Dot color="success" size={8} /> <p>{returnSla(index, 'INSLA')}</p>
                  </Grid>
                  <Grid className="statutAction">
                    <Dot color="error" size={8} /> <p>{returnSla(index, 'OUTSLA')}</p>
                  </Grid>
                  <Grid className="role">
                    <Typography component="p" noWrap>
                      {returnRole(index)}
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

export default Action;
