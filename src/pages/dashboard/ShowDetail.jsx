import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';

export default function MouseOverPopover({ idStatus }) {
  console.log(idStatus);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const status = useSelector((state) => state.status.status);
  const [statutSelect, setStatusSelect] = React.useState();
  React.useEffect(() => {
    setStatusSelect(_.filter(status, { idStatus }));
  }, [idStatus, status]);

  const returnAction = () => {
    if (status && status.length > 0) {
      return _.filter(status, { idStatus })[0]?.title;
    }
  };
  console.log(statutSelect);
  return (
    <div>
      <Typography
        aria-owns={open ? `${idStatus}` : undefined}
        aria-haspopup="true"
        component="p"
        sx={{ margin: 0, fontSize: '11px', padding: '4px 0px' }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        show more details
      </Typography>
      <Popover
        id={idStatus}
        sx={{
          pointerEvents: 'none',
          width: '50rem',
          padding: '10px'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div style={{ padding: '20px' }}>
          <p style={{ textAlign: 'center', padding: 0, margin: 0 }}>{returnAction()}</p>
          {statutSelect && statutSelect[0]?.actions.length > 0 && (
            <>
              <div
                style={{
                  backgroundColor: '#002d72',
                  borderRadius: '3px',
                  width: '100%',
                  color: '#fff',
                  padding: '0px'
                }}
              >
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    margin: '0px',
                    padding: '0px',
                    fontWeight: 'bolder'
                  }}
                >
                  Actions
                </p>
              </div>
              <div style={{ marginLeft: '10px' }}>
                <ol>
                  {statutSelect[0].actions?.map((index, key) => {
                    return (
                      <li style={{ fontSize: '12px' }} key={key}>
                        {index.title}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </>
          )}
          {statutSelect && statutSelect[0]?.instruction && (
            <>
              <div
                style={{
                  backgroundColor: '#002d72',
                  margin: '5px 0px',
                  borderRadius: '3px',
                  width: '100%',
                  color: '#fff',
                  padding: '0px'
                }}
              >
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    margin: '0px',
                    padding: '0px',
                    fontWeight: 'bolder'
                  }}
                >
                  Instruction
                </p>
              </div>
              {statutSelect && <p style={{ fontSize: '12px', margin: '0px 10px', textAlign: 'justify' }}>{statutSelect[0]?.instruction}</p>}
            </>
          )}
        </div>
      </Popover>
    </div>
  );
}
