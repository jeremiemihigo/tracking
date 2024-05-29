import Menu from '@mui/material/Menu';
import PropType from 'prop-types';
import * as React from 'react';
import { Person } from '../../../node_modules/@mui/icons-material/index';

function PositionMenu({ data }) {
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
      <Person
        onMouseEnter={handleClick}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      />
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
        {data.map((index, key) => {
          return (
            <p style={style.p} key={index._id}>
              {key + 1}. {index?.nom}
            </p>
          );
        })}
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
PositionMenu.prototype = {
  data: PropType.array
};
export default PositionMenu;
