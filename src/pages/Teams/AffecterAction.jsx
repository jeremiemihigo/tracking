import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, Button, Box, FormControlLabel, FormGroup, FormControl } from '@mui/material';
import { Save } from '@mui/icons-material';
import axios from 'axios';
import { config, lien_update } from 'static/Lien';
import { message } from 'antd';

function AffecterAction({ value }) {
    console.log(value)
  const action = useSelector((state) => state?.action.action);
  const [actionSelect, setActionSelect] = React.useState([]);
  const [actionData, setActionData] = React.useState();

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  React.useEffect(()=>{
    setActionSelect(value.actions)
  }, [value])

  const handleChange = (item, e) => {
    e.preventDefault();
    if (actionSelect.includes(item)) {
      setActionSelect(actionSelect.filter((x) => x !== item));
    } else {
      setActionSelect([...actionSelect, item]);
    }
  };
  const loading = () => {
    if (action && action.length > 0) {
      let d = action.filter((x) => x.roles[0]?.title === value?.role.toUpperCase());
      setActionData(d);
    }
  };

  React.useEffect(() => {
    loading();
  }, [value]);

  const updateAction = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(lien_update + '/addActionTeam', { data: actionSelect, id: value._id }, config);
      if(response.status === 200){
        success("Modification effectuée", "success")
      }
      
    } catch (error) {
      console.log(error);
    }
    //data, id
  };

  return (
    <div style={{ minWidth: '30rem' }}>
        {contextHolder}
      <Box>
        {actionData &&
          actionData.length > 0 &&
          actionData.map((index) => {
            return (
              <FormControl key={index._id} component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    onClick={(e) => handleChange(index.idAction, e)}
                    control={<Checkbox name={index._id} checked={actionSelect.includes(index.idAction)} />}
                    label={index.title}
                  />
                </FormGroup>
              </FormControl>
            );
          })}
      </Box>
      <Button onClick={(e) => updateAction(e)} color="secondary" variant="contained">
        <Save fontSize="small" sx={{ marginRight: '10px' }} /> Update
      </Button>
    </div>
  );
}
export default AffecterAction;
