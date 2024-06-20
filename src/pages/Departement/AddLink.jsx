import { Button } from 'antd';
import axios from 'axios';
import AutoComplement from 'components/AutoComplete';
import React from 'react';
import { useSelector } from 'react-redux';
import { config, lien_post } from 'static/Lien';
import Select from './Select';

function AddLink() {
  const [fonctionSelect, setFonctionSelect] = React.useState();
  const role = useSelector((state) => state.role.role);
  const linkData = ['zbm', 'processofficer', 'calloperator', 'shopmanager', 'rs', 'field', 'managment_suivi'];
  const [link, setLink] = React.useState('');

  const sendLink = async (e) => {
    e.preventDefault();
    const response = await axios.post(lien_post + '/link', { fonction: fonctionSelect?._id, link }, config);
    console.log(response);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '10px' }}>
        {role && role.length > 0 && (
          <AutoComplement value={fonctionSelect} setValue={setFonctionSelect} options={role} title="Role" propr="title" />
        )}
      </div>
      <div>
        <Select label="Link" data={linkData} value={link} setValue={setLink} />
      </div>
      <Button onClick={(e) => sendLink(e)} type="primary">
        Send
      </Button>
    </div>
  );
}

export default AddLink;
