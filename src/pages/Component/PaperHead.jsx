import { Paper } from '@mui/material';
import PropType from 'prop-types';

function PaperHead({ texte }) {
  return (
    <Paper
      sx={{
        marginBottom: '20px',
        padding: '10px',
        fontWeight: 'bolder',
        backgroundColor: '#dedede'
      }}
    >
      {texte}
    </Paper>
  );
}
PaperHead.prototype = {
  texte: PropType.string
};
export default PaperHead;
