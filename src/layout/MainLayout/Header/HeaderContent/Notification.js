import { CoffeeMaker, DoNotStep, Engineering, Person, Settings } from '@mui/icons-material';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// project import
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';

// assets
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  const table = [
    { id: 1, title: 'Main process', secondary: 'default tracker', link: 'mainProcess', icon: <Engineering fontSize="small" /> },
    { id: 3, title: 'Agents', secondary: 'agents from all departments', link: 'agent', icon: <Person fontSize="small" /> },
    { id: 4, title: 'Roles', secondary: 'All role', link: 'role', icon: <CoffeeMaker fontSize="small" /> },
    {
      id: 5,
      title: 'Stage',
      secondary: 'How the statuses will follow one another',
      icon: <DoNotStep fontSize="small" />,
      link: 'etapes'
    },
    { id: 6, title: 'Setting', secondary: 'Setting', link: 'parametre', icon: <Settings fontSize="small" /> }
  ];

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
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
        <SettingOutlined />
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title=""
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {table.map((index) => {
                      return (
                        <ListItemButton key={index.id}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                color: 'primary.main'
                              }}
                            >
                              {index.icon}
                            </Avatar>
                          </ListItemAvatar>
                          <Link to={index.link} style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItemText
                              primary={
                                <Typography variant="h6">
                                  <Typography component="span" variant="subtitle1">
                                    {index.title}
                                  </Typography>{' '}
                                </Typography>
                              }
                              secondary={index.secondary}
                            />
                          </Link>
                        </ListItemButton>
                      );
                    })}

                    <Divider />
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
