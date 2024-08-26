// material-ui
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Input = ({ label, value, icon, ...others }) => {
  return (
    <FormControl sx={{ width: '100%' }}>
      <OutlinedInput
        size="small"
        id="header-search"
        startAdornment={
          <InputAdornment position="start" sx={{ mr: -0.5 }}>
            {icon}
          </InputAdornment>
        }
        aria-describedby="header-search-text"
        inputProps={{
          'aria-label': 'weight'
        }}
        {...others}
        value={value}
        placeholder={label}
      />
    </FormControl>
  );
};

export default Input;
