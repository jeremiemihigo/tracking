// material-ui
// import { IconButton, Link } from '@mui/material';
import { Box, Typography, useMediaQuery } from '@mui/material';
// import { GithubOutlined } from '@ant-design/icons';
// project import
import { useSelector } from 'react-redux';
import Connected from './Connected';
import FolderComponent from './Folder';
import MobileSection from './MobileSection';
import Notification from './Notification';
import OnlyOne from './OnlyOne';
import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //
import FirstLogin from './FirstLogin';
const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const user = useSelector((state) => state.user.user);

  const menu = useSelector((state) => state.menu);

  return (
    <>
      {!matchesXs && (
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
          <Typography variant="h6" color="default" sx={{ fontWeight: 'bolder' }}>
            {menu.openItem[0]}
          </Typography>
        </Box>
      )}
      {user?.first && <FirstLogin />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
      {user && (user.operation === 'suivi' || user.role === 'SUPER USER') && <OnlyOne />}
      {user && user.role === 'SUPER USER' && <FolderComponent />}
      <Connected />

      {user && user.role === 'SUPER USER' && <Notification />}

      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
