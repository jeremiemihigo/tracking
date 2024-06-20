/* eslint-disable react/prop-types */
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';

function SelectLink(props) {
  const { label, data, value, setValue } = props;
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function displayItems(data) {
    const list = data.map((index) => {
      return (
        <MenuItem value={index} key={index}>
          /{index}
        </MenuItem>
      );
    });
    return list;
  }
  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {displayItems(data)}
      </Select>
    </FormControl>
  );
}
export default SelectLink;
