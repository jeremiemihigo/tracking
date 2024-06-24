// material-ui
import { Box, Typography } from '@mui/material';

// project import
import menuItem from 'menu-items';
import { useSelector } from 'react-redux';
import NavGroup from './NavGroup';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const user = useSelector((state) => state.user.user);
  const returnOne = () => {
    if (user && user.operation === 'operation') {
      return menuItem.operation;
    } else {
      return menuItem.items;
    }
  };
  const navGroups =
    user &&
    returnOne().map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Fix - Navigation Group
            </Typography>
          );
      }
    });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
