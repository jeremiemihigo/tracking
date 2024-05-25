// assets
import { BarChartOutlined, DatabaseOutlined, FileOutlined, HistoryOutlined } from '@ant-design/icons';

// icons
const icons = {
  DatabaseOutlined,
  HistoryOutlined,
  BarChartOutlined,
  FileOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Tracker defaulted',
  type: 'group',
  children: [
    {
      id: 'Pending action',
      title: 'Pending action',
      type: 'item',
      user: 'team',
      url: '/',
      icon: icons.DatabaseOutlined,
      breadcrumbs: false
    },
    {
      id: 'Monitoring',
      title: 'Monitoring',
      user: 'managment',
      type: 'item',
      url: '/analyse',
      icon: icons.BarChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'Historical status',
      title: 'Historical status',
      type: 'item',
      user: 'all',
      url: '/history',
      icon: icons.HistoryOutlined,
      breadcrumbs: false
    },
    {
      id: 'All customers',
      title: 'All customers',
      type: 'item',
      user: 'all',
      url: '/data_to_track',
      icon: icons.HistoryOutlined,
      breadcrumbs: false
    },
    {
      id: 'Rapport',
      title: 'Rapport',
      type: 'item',
      user: 'managment',
      url: '/rapport',
      icon: icons.FileOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
