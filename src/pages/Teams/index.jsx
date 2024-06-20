import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { PutAgent } from 'Redux/agent';
import ConfirmDialog from 'components/ConfirmDialog';
import MainCard from 'components/MainCard';
import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';

function Index() {
  const role = useSelector((state) => state.role.role);
  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });

  //New
  const user = useSelector((state) => state.user?.user);
  const agent = useSelector((state) => state.agent.agent);
  const status = useSelector((state) => state.status.status);

  const [agentSelect, setAgentSelect] = React.useState({ last: '', idRole: '' });
  const { last, idRole } = agentSelect;
  const [allstatus, setAllstatus] = React.useState();
  const returnAgent = (id) => {
    return _.filter(role, { id: id })[0].agents;
  };
  const [statusAgent, setStatusAgent] = React.useState([]);
  React.useEffect(() => {
    if (last !== '') {
      setStatusAgent(_.filter(agent, { codeAgent: last?.codeAgent })[0]?.mystatus || []);
      setAllstatus(_.filter(status, { role: idRole }));
    }
  }, [last]);
  const handleChange = (item, e) => {
    if (statusAgent.includes(item)) {
      setStatusAgent(statusAgent.filter((x) => x !== item));
    } else {
      setStatusAgent([...statusAgent, item]);
    }
  };
  const check = (id) => {
    if (statusAgent.includes(id)) {
      return true;
    } else {
      return false;
    }
  };
  const dispatch = useDispatch();
  const sendMyStatus = (e) => {
    e.preventDefault();
    const data = {
      id: last._id,
      status: statusAgent
    };
    dispatch(PutAgent(data));
  };
  return (
    <MainCard>
      <Grid container>
        <Grid item lg={4} xs={12} sm={12} md={4}>
          <Grid>
            {user?.fonctio.map((index) => {
              return (
                <div key={index._id} className="firstDiv">
                  <div className="divTitle">
                    <p>{index.title}</p>
                  </div>
                  <div>
                    {returnAgent(index.id).map((item) => {
                      return (
                        <div key={item._id} className="name" onClick={() => setAgentSelect({ idRole: index.id, last: item, newagent: '' })}>
                          <p>{item.nom}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Grid>
        </Grid>
        <Grid item lg={8} xs={12} sm={6} md={8}>
          <div style={{ paddingRight: '10px' }}>
            <table>
              <thead>
                <th>Check</th>
                <th>Status</th>
              </thead>
              <tbody>
                {allstatus &&
                  allstatus.length > 0 &&
                  allstatus.map((index) => {
                    return (
                      <tr key={index._id} onClick={(e) => handleChange(index.idStatus, e)} style={{ cursor: 'pointer' }}>
                        <td>
                          <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox name={index._id} checked={check(index.idStatus)} />} />
                            </FormGroup>
                          </FormControl>
                        </td>
                        <td>{index.title}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {allstatus && (
            <Button variant="contained" color="primary" onClick={(e) => sendMyStatus(e)}>
              Save
            </Button>
          )}
        </Grid>
      </Grid>

      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </MainCard>
  );
}
export default Index;
