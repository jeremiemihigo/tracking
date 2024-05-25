// material-ui
// import { IconButton, Link } from '@mui/material';
import { Box, useMediaQuery, Typography } from '@mui/material';
// import { GithubOutlined } from '@ant-design/icons';
// project import
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { useSelector } from 'react-redux';
import FolderComponent from './Folder';
import OnlyOne from './OnlyOne';
// import { addTeams } from 'static/Lien';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const user = useSelector((state) => state.user.user);

  const menu = useSelector((state) => state.menu);

  return (
    <>
      {!matchesXs && (
        <Box sx={{ width: '100%',  ml: { xs: 0, md: 1 } }}>
          <Typography variant="h6" color="default" sx={{fontWeight: 'bolder',}}>
            {menu.openItem[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            fonction : {user?.role}
          </Typography>
        </Box>
      )}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
      {/* {addTeams(user?.role) && <OnlyOne/> } */}
       <OnlyOne/>

     <FolderComponent /> 
      {user?.fonction === 'admin' && <Notification />} 

      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
