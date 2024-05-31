import PublishIcon from '@mui/icons-material/Publish';
import { Fab, Paper, Tooltip, Typography } from '@mui/material';
import PropType from 'prop-types';

function PaperHead({ texte, functionExec }) {
  return (
    <Paper
      sx={{
        marginBottom: '20px',
        padding: '10px',
        fontWeight: 'bolder',
        backgroundColor: '#dedede',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography>{texte}</Typography>
      {functionExec && (
        <Tooltip title="Find out if the customer has been visited">
          <Fab onClick={() => functionExec()} color="primary" size="small">
            <PublishIcon fontSize="small" />
          </Fab>
        </Tooltip>
      )}
    </Paper>
  );
}
PaperHead.prototype = {
  texte: PropType.string
};
export default PaperHead;
