// material-ui
import { Grid } from '@mui/material';

// project import
// import MainCard from 'components/MainCard';
import { CreateContexteGlobal } from 'GlobalContext';
import { message } from 'antd';
import LoaderGif from 'components/LoaderGif';
import PaperHead from 'pages/Component/PaperHead';
import React from 'react';
import Contexte from './Contexte';
import Detail from './Detail';
import DetailListe from './DetailListe';
import Liste from './Liste';
import './action.css';
// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const IndexTakeAction = ({ data, setData, actionFilter }) => {
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
      {actionFilter && (
        <Grid sx={{ marginTop: '20px' }}>
          <PaperHead texte={actionFilter.title} />
        </Grid>
      )}
      {!data && <LoaderGif width={120} height={120} />}
      {data && (
        <Grid container>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            {actionFilter && <Liste client={data} action={actionFilter} />}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            {actionFilter && <Detail action={actionFilter} />}
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} sx={{ height: '20px', position: 'relative' }}>
            <DetailListe />
          </Grid>
        </Grid>
      )}
    </Contexte>
  );
};

export default IndexTakeAction;
