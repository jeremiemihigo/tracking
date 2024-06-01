// material-ui
// import { IconButton, Link } from '@mui/material';
import { Box, Typography, useMediaQuery } from '@mui/material';
// import { GithubOutlined } from '@ant-design/icons';
// project import
import { useSelector } from 'react-redux';
import { addTeams, allpermissions } from 'static/Lien';
import Connected from './Connected';
import FolderComponent from './Folder';
import MobileSection from './MobileSection';
import Notification from './Notification';
import OnlyOne from './OnlyOne';
import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const menu = useSelector((state) => state.menu);

  return (
    <>
      {!matchesXs && (
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
          <Typography variant="h6" color="default" sx={{ fontWeight: 'bolder' }}>
            {menu.openItem[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            fonction : {user?.role}
          </Typography>
        </Box>
      )}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
      {(addTeams(user?.role) || allpermissions(user?.role)) && <OnlyOne />}
      {(addTeams(user?.role) || allpermissions(user?.role)) && <FolderComponent />}
      <Connected />

      {allpermissions(user?.role) && <Notification />}

      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
