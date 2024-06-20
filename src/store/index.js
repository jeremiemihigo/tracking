// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import { ReadProcess } from 'Redux/Process';
import { Readrole } from 'Redux/Role';
import { Readaction } from 'Redux/action';
import { Readagent } from 'Redux/agent';
import { Readdatatotrack } from 'Redux/dataTotrack';
import { Readetape } from 'Redux/etape';
import { Readinitiale } from 'Redux/initiale';
import { ReadStatus } from 'Redux/status';
import { Readtoday } from 'Redux/today';
import { ReadUser } from 'Redux/user';
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers
});

const { dispatch } = store;
dispatch(ReadUser());
dispatch(Readtoday());
dispatch(Readinitiale());
dispatch(ReadProcess());
dispatch(ReadStatus());
dispatch(Readaction());
dispatch(Readrole());
dispatch(Readagent());
dispatch(Readetape());
dispatch(Readdatatotrack());

export { dispatch, store };
