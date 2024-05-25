import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ListeClient from 'pages/dashboard/ListeClient';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const TakeAction = Loadable(lazy(() => import('pages/TakeAction')));
const Analyse = Loadable(lazy(() => import('pages/Analyse')));
const Params = Loadable(lazy(() => import('pages/Param')));
const DataToTrack = Loadable(lazy(() => import('pages/DataToTrack')));
const Historique = Loadable(lazy(() => import('pages/History')));
const Teams = Loadable(lazy(() => import('pages/Teams')));
const Rapport = Loadable(lazy(() => import('pages/Rapport')));
const NotFound = Loadable(lazy(() => import('pages/NotFound')));

// ==============================|| MAIN ROUTING ||============================== //

const RouteNonAdmin = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },

    {
      path: 'event',
      element: <TakeAction />
    },
    {
      path: 'analyse',
      element: <Analyse />
    },
    {
      path: 'parametre',
      element: <Params />
    },
    {
      path: 'data_to_track',
      element: <DataToTrack />
    },
    {
      path: 'history',
      element: <Historique />
    },
    {
      path: 'teams',
      element: <Teams />
    },
    {
      path: 'liste',
      element: <ListeClient />
    },
    {
      path: 'rapport',
      element: <Rapport />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
};

export default RouteNonAdmin;
