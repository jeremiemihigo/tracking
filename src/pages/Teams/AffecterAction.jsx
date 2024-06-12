import { Save } from '@mui/icons-material';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { config, lien_update } from 'static/Lien';

function AffecterAction({ value }) {
  console.log(value);
  const status = useSelector((state) => state.status?.status);
  const [statusSelect, setStatusSelect] = React.useState([]);
  const [statusData, setStatusData] = React.useState();

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  React.useEffect(() => {
    setStatusSelect(value.status);
  }, [value]);

  const handleChange = (item, e) => {
    e.preventDefault();
    if (statusSelect.includes(item)) {
      setStatusSelect(statusSelect.filter((x) => x !== item));
    } else {
      setStatusSelect([...statusSelect, item]);
    }
  };
  const loading = () => {
    if (status && status.length > 0) {
      let d = status.filter((x) => x.roles[0]?.title === value?.role.toUpperCase());
      setStatusData(d);
    }
  };

  React.useEffect(() => {
    loading();
  }, [value]);

  const updateAction = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(lien_update + '/addActionTeam', { data: statusSelect, id: value._id }, config);
      if (response.status === 200) {
        success('Modification effectuée', 'success');
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
        {statusData &&
          statusData.length > 0 &&
          statusData.map((index) => {
            return (
              <FormControl key={index._id} component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    onClick={(e) => handleChange(index.idStatus, e)}
                    control={<Checkbox name={index._id} checked={statusSelect.includes(index.idStatus)} />}
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
