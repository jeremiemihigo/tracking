/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import './etape.css';

const filter = createFilterOptions();

function AutoComplement({ value, setValue, options, title }) {
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={options}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => (
        <div {...props} className="combobox">
          <p className="paction">action : {option.title}</p>
          <p className="pstatus">status : {option.status.title}</p>
          <p className="prole">role : {option.roles[0]?.title}</p>
        </div>
      )}
      sx={{ width: '100%' }}
      freeSolo
      renderInput={(params) => <TextField {...params} label={title || 'Titre'} />}
    />
  );
}
export default AutoComplement;
