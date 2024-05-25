/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoComplement from 'components/AutoComplete';
import { AddMembre } from 'Redux/Role';
import { Button } from '@mui/material';

function AjouterMember({ role }) {
  const agents = useSelector((state) => state.agent?.agent);
  const [agentSelect, setAgentSelect] = React.useState('');
  const dispatch = useDispatch();

  function send(e) {
    e.preventDefault();
    let d = { code: agentSelect?.codeAgent, id: role._id, object: 'add' };
    dispatch(AddMembre(d));
    setAgentSelect('');
  }
  return (
    <div style={{ width: '20rem' }}>
      <div style={{ margin: '10px 0px' }}>
        {agents && agents.length > 0 && (
          <AutoComplement value={agentSelect} setValue={setAgentSelect} options={agents} title="Selectionnez un agent" propr="nom" />
        )}
      </div>
      <div>
        <Button variant="contained" color="secondary" onClick={(e) => send(e)}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default AjouterMember;
