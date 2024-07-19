import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ListeClient from 'pages/dashboard/ListeClient';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const MainProcess = Loadable(lazy(() => import('pages/Parametre/MainProcess')));
const Details = Loadable(lazy(() => import('pages/Parametre')));
const Agent = Loadable(lazy(() => import('pages/Parametre/Agent')));
const Role = Loadable(lazy(() => import('pages/Parametre/Role')));
const Action = Loadable(lazy(() => import('pages/Parametre/Action')));
const Folder = Loadable(lazy(() => import('pages/Parametre/Dossier')));
const Analyse = Loadable(lazy(() => import('pages/Analyse')));
const Params = Loadable(lazy(() => import('pages/Param')));
const DataToTrack = Loadable(lazy(() => import('pages/DataToTrack')));
const Historique = Loadable(lazy(() => import('pages/History')));
const Teams = Loadable(lazy(() => import('pages/Teams')));
const Rapport = Loadable(lazy(() => import('pages/Rapport')));
const NotFound = Loadable(lazy(() => import('pages/NotFound')));
const AfficheZbm = Loadable(lazy(() => import('pages/Analyse/AffichageZbm')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoute = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },

    {
      path: 'mainProcess',
      element: <MainProcess />
    },
    {
      path: 'details',
      element: <Details />
    },
    {
      path: 'agent',
      element: <Agent />
    },

    {
      path: '/role',
      element: <Role />
    },
    {
      path: '/:status',
      element: <Action />
    },
    {
      path: 'folder',
      element: <Folder />
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
    }
  ]
};

export default AdminRoute;
