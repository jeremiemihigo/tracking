/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function TextArea({ setValue, value, placeholder }) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%' }
      }}
      autoComplete="on"
    >
      <TextField
        onChange={(e) => setValue(e.target.value)}
        id="outlined-multiline-static"
        value={value}
        fullWidth
        label={placeholder}
        multiline
        rows={3}
      />
    </Box>
  );
}

export default TextArea;
