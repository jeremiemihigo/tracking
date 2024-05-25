import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Box } from '@mui/material';
import { Save } from '@mui/icons-material';
import axios from 'axios';
import { config, lien_update } from 'static/Lien';
import { message } from 'antd';
import AutoComplement from 'components/AutoComplete';

function AddMember({ value }) {
  const agent = useSelector((state) => state?.agent.agent);
  const [agentSelect, setAgentSelect] = React.useState('');

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  const updateMembre = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(lien_update + '/addMemberTeam', { idTeam: value?.idTeam, id: agentSelect?._id }, config);
      if (response.status === 200) {
        success('Modification effectuée', 'success');
      }
    } catch (error) {
      console.log(error);
    }
    //data, id
  };

  return (
    <div style={{ minWidth: '25rem' }}>
      {contextHolder}
      <Box sx={{margin:"10px 0px"}}>
        <AutoComplement value={agentSelect} setValue={setAgentSelect} options={agent} title="Agent" propr="nom" />
      </Box>
      <Button onClick={(e) => updateMembre(e)} color="secondary" variant="contained">
        <Save fontSize="small" sx={{ marginRight: '10px' }} /> Update
      </Button>
    </div>
  );
}
export default AddMember;
