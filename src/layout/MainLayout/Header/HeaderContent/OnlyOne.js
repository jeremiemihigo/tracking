import { useRef, useState } from 'react';

// material-ui
import { Box, IconButton } from '@mui/material';

import { People } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// project import

// assets

// sx styles

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const OnlyOne = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Link to="/teams">
        <IconButton
          disableRipple
          color="secondary"
          sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
          aria-label="open profile"
          ref={anchorRef}
          aria-controls={open ? 'profile-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <People fontSize="small" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default OnlyOne;
