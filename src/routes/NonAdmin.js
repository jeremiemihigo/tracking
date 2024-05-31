import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ListeClient from 'pages/dashboard/ListeClient';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Analyse = Loadable(lazy(() => import('pages/Analyse')));
const Params = Loadable(lazy(() => import('pages/Param')));
const DataToTrack = Loadable(lazy(() => import('pages/DataToTrack')));
const Historique = Loadable(lazy(() => import('pages/History')));
const Teams = Loadable(lazy(() => import('pages/Teams')));
const Rapport = Loadable(lazy(() => import('pages/Rapport')));
const NotFound = Loadable(lazy(() => import('pages/NotFound')));
const AfficheZbm = Loadable(lazy(() => import('pages/Analyse/AffichageZbm')));
const Folder = Loadable(lazy(() => import('pages/Parametre/Dossier')));

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
    },
    {
      path: '/region_monitoring',
      element: <AfficheZbm />
    },
    {
      path: 'folder',
      element: <Folder />
    }
  ]
};

export default RouteNonAdmin;
