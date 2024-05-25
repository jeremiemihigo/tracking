// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';

// ==============================|| COMBINE REDUCERS ||============================== //
import departement from 'Redux/Departement';
import process from 'Redux/Process';
import role from 'Redux/Role';
import action from 'Redux/action';
import agent from 'Redux/agent';
import data_to_track from 'Redux/dataTotrack';
import etape from 'Redux/etape';
import initiale from 'Redux/initiale';
import main from 'Redux/mainProcess';
import status from 'Redux/status';
import today from 'Redux/today';
import user from 'Redux/user';

const reducers = combineReducers({
  menu,
  data_to_track,
  today,
  initiale,
  main,
  user,

  etape,
  process,
  status,
  action,
  role,
  agent,
  departement
});

export default reducers;
