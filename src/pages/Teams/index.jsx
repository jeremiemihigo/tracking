import { Grid, Typography } from '@mui/material';
import { PutAgent } from 'Redux/agent';
import MainCard from 'components/MainCard';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';

function Index() {
  const status = useSelector((state) => state.status?.status.filter((x) => ['Z1FJYLR1', 'NRNYH6IY'].includes(x.role)));
  const agent = useSelector((state) => state.agent?.agent.filter((x) => x.fonction === 'FCBS68AI'));
  const [agentSelect, setAgent] = React.useState();
  const [statusSelect, setStatus] = React.useState([]);

  const selectionAgent = (a) => {
    setStatus(a.mystatus);
    setAgent(a._id);
  };
  const click = (d) => {
    if (!statusSelect.includes(d)) {
      setStatus([...statusSelect, d]);
    } else {
      let i = statusSelect;
      setStatus(statusSelect.filter((x) => x !== d));
    }
  };

  const dispatch = useDispatch();
  const sendMyStatus = (e) => {
    e.preventDefault();
    const data = {
      id: agentSelect,
      status: statusSelect
    };
    dispatch(PutAgent(data));
  };

  return (
    <div>
      <MainCard>
        <div className="contained">
          <div>
            <Grid container>
              <Grid item lg={6}>
                {status &&
                  status.map((index) => {
                    return (
                      <div
                        key={index._id}
                        className={statusSelect.includes(index.idStatus) ? 'status statusSelect' : 'status'}
                        onClick={() => click(index.idStatus)}
                      >
                        <Typography component="p" noWrap className="statusTitle">
                          {index.title}
                        </Typography>
                        <Typography className="statusRole">{index.roles[0].title}</Typography>
                      </div>
                    );
                  })}
              </Grid>
              <Grid lg={6} sx={{ paddingLeft: '10px' }}>
                {agent &&
                  agent.map((index) => {
                    return (
                      <div key={index._id} onClick={() => selectionAgent(index)}>
                        <div className={agentSelect === index._id ? 'operator operatorSelect' : 'operator'}>
                          <Typography className="operatorName" component="p" noWrap>
                            {index.nom}
                          </Typography>
                          <Typography className="operatorStatus" component="p">
                            {index.mystatus.length === 0 ? 'Aucun status' : index.mystatus.length + ' status'}
                          </Typography>
                        </div>
                        {agentSelect === index._id && (
                          <button className="btnbutton" onClick={(e) => sendMyStatus(e)}>
                            Valider
                          </button>
                        )}
                      </div>
                    );
                  })}
              </Grid>
            </Grid>
          </div>
        </div>
      </MainCard>
    </div>
  );
}

export default Index;
