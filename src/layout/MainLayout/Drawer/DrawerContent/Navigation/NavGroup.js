import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { Box, List, Typography } from '@mui/material';

// project import
import { CreateContexteGlobal } from 'GlobalContext';
import React from 'react';
import { allpermissions, returnCategorie } from 'static/Lien';
import NavItem from './NavItem';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;
  const [option, setOption] = React.useState();

  const user = useSelector((state) => state.user);
  const { handleLogout } = React.useContext(CreateContexteGlobal);
  const returnItems = () => {
    try {
      if (user.readUser === 'success') {
        if (
          returnCategorie(user.user?.role) === 'managment' ||
          returnCategorie(user.user?.role) === 'field' ||
          returnCategorie(user.user?.role) === 'ZBM'
        ) {
          setOption(item.children.filter((x) => x.user === 'managment' || x.user === 'all'));
        }
        if (returnCategorie(user.user?.role) === 'team') {
          setOption(item.children.filter((x) => x.user === 'team' || x.user === 'all'));
        }
        if (allpermissions(user.user?.role)) {
          setOption(item.children);
        }
      }
      if (user.readUser === 'rejected') {
        handleLogout();
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    returnItems();
  }, [user]);

  const navCollapse = option?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
            collapse - only available in paid version
          </Typography>
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
