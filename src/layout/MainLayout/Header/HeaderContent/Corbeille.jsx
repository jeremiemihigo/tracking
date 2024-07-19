import React, { useRef, useState } from 'react';

// material-ui
import {
  Avatar,
  Badge,
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
// project import
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';
// assets
import { CloseOutlined, GiftOutlined, NotificationOutlined } from '@ant-design/icons';
import { CreateContexteGlobal } from 'GlobalContext';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { config, lien_read } from 'static/Lien';

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
  const user = useSelector((state) => state.user.user);

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
  const [donner, setDonner] = React.useState([]);
  const loading = async () => {
    try {
      const response = await axios.get(lien_read + '/corbeille', config);
      if (response.status === 200) {
        setDonner(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loading();
  }, []);

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  const { socket } = React.useContext(CreateContexteGlobal);
  const [change, setChange] = React.useState();
  React.useEffect(() => {
    socket?.on('corbeille', (a) => {
      setChange(a);
    });
  }, [socket]);
  React.useEffect(() => {
    if (change) {
      if (donner.length > 6) {
        donner.pop();
      }
      setDonner([change, ...donner]);
    }
  }, [change]);

  const returnName = (name) => {
    if (user.codeAgent === name) {
      return 'vous';
    } else {
      return name;
    }
  };
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
        <Badge badgeContent={donner.length} color="primary">
          <NotificationOutlined />
        </Badge>
      </IconButton>
      {donner.length > 0 && (
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
                    title="Notification"
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
                      {donner.length > 0 &&
                        donner.map((index) => {
                          return (
                            <ListItemButton key={index._id}>
                              <ListItemAvatar>
                                <Avatar
                                  sx={{
                                    color: 'success.main',
                                    bgcolor: 'success.lighter'
                                  }}
                                >
                                  <GiftOutlined />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography variant="h6">
                                    {returnName(index.agentEffectuant)}
                                    <Typography component="span" variant="subtitle1">
                                      {' : ' + index.texte}
                                    </Typography>{' '}
                                    <Typography component="p" variant="subtitle2">
                                      {moment(index.createdAt).fromNow()}
                                    </Typography>{' '}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          );
                        })}

                      <Divider />
                      <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                        <ListItemText primary={<Typography variant="h6" color="primary"></Typography>} />
                      </ListItemButton>
                    </List>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            </Transitions>
          )}
        </Popper>
      )}
    </Box>
  );
};

export default Notification;
