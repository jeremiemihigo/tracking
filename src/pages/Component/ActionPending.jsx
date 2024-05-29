import { Grid, Paper, Tooltip, Typography } from '@mui/material';
import Dot from 'components/@extended/Dot';
import PropType from 'prop-types';

function ActionPending({ action, role, nombre, outsla, insla, lastupdate, bg }) {
  return (
    <div>
      <Tooltip title={action}>
        <Paper elevation={2} sx={{ padding: '5px', backgroundColor: bg }}>
          <Typography noWrap style={{ fontSize: '11px', textAlign: 'center', fontWeight: 700 }}>
            {action}
          </Typography>
          <Typography component="p" sx={{ fontSize: '9px', textAlign: 'center', padding: '0px', margin: '0px' }}>
            {role}
          </Typography>
          <p style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}>{nombre}</p>
          <Grid sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Grid sx={style.flex}>
              <Grid sx={style.flexOutsla}>
                <Dot size={5} color="error" />
                <Typography sx={{ fontSize: '9px', marginLeft: '3px', fontWeight: 'bolder', textAlign: 'right' }} component="p">
                  {outsla}
                </Typography>
              </Grid>
              <Grid sx={style.flexInsla}>
                <Dot size={5} color="success" />
                <Typography sx={{ fontSize: '9px', marginLeft: '3px', fontWeight: 'bolder', textAlign: 'right' }} component="p">
                  {insla}
                </Typography>
              </Grid>
            </Grid>
            <Typography sx={{ fontSize: '9px', textAlign: 'right' }} component="p">
              {lastupdate}
            </Typography>
          </Grid>
        </Paper>
      </Tooltip>
    </div>
  );
}
const style = {
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexOutsla: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px'
  },
  flexInsla: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
ActionPending.prototype = {
  action: PropType.string,
  role: PropType.string,
  nombre: PropType.number,
  outsla: PropType.number,
  insla: PropType.number,
  lastupdate: PropType.string,
  bg: PropType.string
};
export default ActionPending;
