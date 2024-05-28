/* eslint-disable react-hooks/exhaustive-deps */
// material-ui
import { Grid } from '@mui/material';
import { CreateContexteGlobal } from 'GlobalContext';
import { message } from 'antd';
import NofificationAudio from 'assets/notification/error.mp3';
import axios from 'axios';
import AnalyticEcommerce from 'components/AnalyticEcommerce';
import LoaderGif from 'components/LoaderGif';
import _ from 'lodash';
import PaperHead from 'pages/Component/PaperHead';
import Contexte from 'pages/TakeAction/Contexte';
import Liste from 'pages/TakeAction/Liste';
import RenseignerFeedback from 'pages/TakeAction/RenseignerFeedback';
import IndexTakeAction from 'pages/TakeAction/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { config, differenceDays, lien_read, returnCategorie } from 'static/Lien';
import Popup from 'static/Popup';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
// import Notification from "components/Notification
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState();
  const now = useSelector((state) => state.today?.today);
  const allaction = useSelector((state) => state?.action.action);
  const [show, setShow] = React.useState(1);

  const returnAction = (id) => {
    if (allaction && allaction.length > 0) {
      return _.filter(allaction, { idAction: id })[0]?.title;
    }
  };
  const [data, setData] = React.useState([]);
  const user = useSelector((state) => state.user?.user);

  React.useEffect(() => {
    if (user && returnCategorie(user.role) === 'team') {
      console.log('');
    } else {
      window.location.replace('/analyse');
    }
  }, [user]);

  const loadingClient = async () => {
    try {
      const response = await axios.get(lien_read + '/clientField', config);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadingClient();
  }, []);

  const couleurAll = (allData) => {
    let nombreIn = 0;
    let nombreOut = 0;
    let today = 0;
    for (let i = 0; i < allData.visites.length; i++) {
      if (differenceDays(now?.datetime, allData.visites[i].updatedAt) === 0) {
        today = today + 1;
      } else {
        if (differenceDays(now?.datetime, allData.visites[i].updatedAt) < allData.visites[i].action.delai) {
          nombreIn = nombreIn + 1;
        } else {
          nombreOut = nombreOut + 1;
        }
      }
    }
    let pourcentage = ((nombreIn + today) * 100) / allData.visites.length;
    return { pourcentage, today, nombreIn, nombreOut };
  };

  const [actionSelect, setActionSelect] = React.useState();
  const [analyse, setAnalyse] = React.useState([]);
  const structuration = () => {
    let groupe = _.groupBy(data, 'action.idAction');
    let key = Object.keys(groupe);
    let table = [];
    for (let i = 0; i < key.length; i++) {
      table.push({
        action: key[i],
        visites: groupe['' + key[i]]
      });
    }
    setAnalyse(table);
  };

  const [dataChange, setDataChange] = React.useState({ content: null, error: '' });
  const { content } = dataChange;
  const { socket } = React.useContext(CreateContexteGlobal);
  React.useEffect(() => {
    socket.on('renseigne', (donner) => {
      if (!donner.error) {
        setDataChange({ content: donner.content[0] });
      } else {
        setDataChange({ content: null, error: donner.content });
      }
      // new Notification('Action effectuee');
    });
  }, [socket]);

  React.useEffect(() => {
    if (content) {
      if (user.permission.includes(content?.actionEnCours)) {
        let donner = data;
        donner.push(content);
        setData(donner);
        structuration();
      } else {
        if (data.length > 0) {
          setData(data.filter((x) => x._id !== content._id));
          structuration();
          if (open) {
            setActionSelect(data.filter((x) => x._id !== content._id));
          }
        }
      }
    }
  }, [content]);

  const [openListe, setOpenListe] = React.useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const success = (texte, type) => {
    messageApi.open({
      type,
      content: '' + texte,
      duration: 3
    });
  };

  const [dataAction, setDataAction] = React.useState();
  const [actionFilter, setActionFilter] = React.useState();
  const openFonction = (index) => {
    if (user?.permission.includes(index.visites[0].actionEnCours)) {
      setActionSelect(index.visites);
      if (index.action === 'SA89AF') {
        setOpen(true);
      } else {
        setActionFilter(_.filter(allaction, { idAction: index.action })[0]);
        setDataAction(index.visites);
        setShow(2);
      }
    } else {
      const audio = new Audio(NofificationAudio);
      audio.play();
      success('you cannot change anything about this action', 'error');
    }
  };
  const functionListe = (index) => {
    const { visites, action } = index;
    navigate('/liste', { state: { visites, action } });
  };
  React.useEffect(() => {
    structuration();
  }, [data]);
  return (
    <Contexte>
      {contextHolder}
      {show === 1 && <PaperHead texte="Pending actions" />}

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {show === 1 &&
          analyse.length > 0 &&
          analyse.map((index) => {
            return (
              <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={4} lg={4} key={index.action}>
                <AnalyticEcommerce
                  functionAction={() => openFonction(index)}
                  functionListe={() => functionListe(index)}
                  title={returnAction(index.action)}
                  count={index.visites.length}
                  bg={couleurAll(index)}
                />
              </Grid>
            );
          })}
      </Grid>
      {show === 2 && dataAction && <IndexTakeAction data={dataAction} setData={setDataAction} actionFilter={actionFilter} />}

      {!analyse && <LoaderGif width={200} height={200} />}

      {actionSelect && (
        <Popup open={open} setOpen={setOpen} title="Take action">
          <RenseignerFeedback visites={actionSelect} changeAction={setActionSelect} />
        </Popup>
      )}
      {actionSelect && (
        <Popup open={openListe} setOpen={setOpenListe} title="Take action">
          <Liste client={actionSelect} />
        </Popup>
      )}

      {/* <Notification texte="je suis un texte" /> */}
    </Contexte>
  );
};

export default DashboardDefault;
