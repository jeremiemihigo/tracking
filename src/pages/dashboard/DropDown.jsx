import Menu from '@mui/material/Menu';
import PropType from 'prop-types';
import * as React from 'react';
import { Person } from '@mui/icons-material';

function DropDown({ data, title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  return (
    <>
      <p
        style={{ fontSize: '10px' }}
        onMouseEnter={handleClick}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {title}
      </p>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {data[0]?.instruction}
      </Menu>
    </>
  );
}
const style = {
  p: {
    fontSize: '12px',
    padding: '3px 30px',
    margin: '0px'
  }
};
DropDown.prototype = {
  data: PropType.string
};
export default DropDown;
