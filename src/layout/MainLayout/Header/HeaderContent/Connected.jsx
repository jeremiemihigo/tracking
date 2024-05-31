import { useRef, useState } from 'react';

// material-ui
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import { Badge, Box, ClickAwayListener, Divider, IconButton, List, Paper, Popper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

// project import
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';

// assets
import { CloseOutlined } from '@ant-design/icons';
import { CreateContexteGlobal } from 'GlobalContext';
import Dot from 'components/@extended/Dot';
import _ from 'lodash';
import { useSelector } from 'react-redux';

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

const Connected = () => {
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

  const [dataChange, setDataChange] = React.useState([]);
  const { socket } = React.useContext(CreateContexteGlobal);
  React.useEffect(() => {
    socket.on('userConnected', (donner) => {
      setDataChange(donner);
      // new Notification('Action effectuee');
    });
  }, [socket]);
  const user = useSelector((state) => state.user?.user);
  const agent = useSelector((state) => state.agent?.agent);
  const returnAgent = (id) => {
    if (agent && agent.length > 0) {
      if (_.filter(agent, { codeAgent: id })[0]?.codeAgent !== user.codeAgent) {
        return _.filter(agent, { codeAgent: id })[0]?.role;
      } else {
        return '';
      }
    } else {
      return id;
    }
  };
  const returnNom = (id, nom) => {
    if (user && user.codeAgent === id) {
      return 'vous';
    } else {
      return nom;
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
        <Badge badgeContent={dataChange.filter((x) => x.nom !== undefined).length} color="primary">
          <WifiTetheringIcon />
        </Badge>
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
                  <Typography sx={{ textAlign: 'center', marginTop: '10px', marginBottom: '0px', padding: 0 }}>Online users</Typography>
                  <List
                    component="nav"
                    sx={{
                      p: 1,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {dataChange.reverse().map((index, key) => {
                      return (
                        index.nom !== undefined && (
                          <div
                            key={key}
                            style={{
                              display: 'flex',
                              borderRadius: '10px',
                              marginBottom: '5px',
                              alignItems: 'center',
                              background: '#dedede',
                              padding: '5px'
                            }}
                          >
                            <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
                              <Dot color="success" />
                            </div>
                            <div style={{ width: '90%', padding: 0 }}>
                              <p style={{ padding: 0, margin: 0, fontSize: '10px', fontWeight: 'bolder' }}>
                                {returnNom(index.codeAgent, index?.nom)}
                              </p>
                              <p style={{ padding: 0, margin: 0, fontSize: '9px' }}>{returnAgent(index?.codeAgent)}</p>
                            </div>
                          </div>
                        )
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

export default Connected;
