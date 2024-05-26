// material-ui
import { Grid } from '@mui/material';

// project import
// import MainCard from 'components/MainCard';
import { CreateContexteGlobal } from 'GlobalContext';
import { message } from 'antd';
import LoaderGif from 'components/LoaderGif';
import _ from 'lodash';
import PaperHead from 'pages/Component/PaperHead';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { config, lien_read } from 'static/Lien';
import axios from '../../../node_modules/axios/index';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
import Contexte from './Contexte';
import Detail from './Detail';
import DetailListe from './DetailListe';
import Liste from './Liste';
import './action.css';
// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const ComponentTypography = () => {
  const location = useLocation();
  let { state } = location;
  const [data, setData] = React.useState();
  const action = useSelector((state) => state.action?.action);
  const [actionFilter, setActionFilter] = React.useState();

  function returnAction() {
    setActionFilter(_.filter(action, { idAction: state })[0]);
  }

  const loaingclient = async () => {
    const client = await axios.get(`${lien_read}/clientAction/${state}`, config);
    if (client.status === 200) {
      setData(client.data);
    }
  };
  React.useEffect(() => {
    returnAction();
    loaingclient();
  }, [state]);

  const { socket } = React.useContext(CreateContexteGlobal);

  const [datasocket, setDataSocket] = React.useState();
  React.useEffect(() => {
    socket.on('postclients', (data) => {
      setDataSocket(data);
    });
  }, [socket]);

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  React.useEffect(() => {
    if (datasocket && !datasocket?.error && data) {
      setData(data.filter((x) => x._id !== datasocket.content[0]._id));
    }
    if (datasocket && datasocket?.error) {
      success(datasocket.content, 'error');
    }
  }, [datasocket]);

  return (
    <Contexte>
      {contextHolder}
      {actionFilter && <PaperHead texte={actionFilter.title} />}
      {!data && <LoaderGif width={120} height={120} />}
      {data && (
        <Grid container spacing={3} sx={{ paddingLeft: '10px' }}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            {actionFilter && <Liste client={data} action={actionFilter} />}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            {actionFilter && <Detail action={actionFilter} />}
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} sx={{ height: '20px' }}>
            <DetailListe />
          </Grid>
        </Grid>
      )}
    </Contexte>
  );
};

export default ComponentTypography;
