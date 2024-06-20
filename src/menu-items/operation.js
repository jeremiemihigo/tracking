// assets
import { DatabaseOutlined, FileOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  DatabaseOutlined,
  HistoryOutlined,
  FileOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const operation = {
  id: 'group-dashboard',
  title: 'Tracker defaulted',
  type: 'group',
  children: [
    {
      id: 'Pending action',
      title: 'Pending action',
      type: 'item',
      url: '/',
      icon: icons.DatabaseOutlined,
      breadcrumbs: false
    },
    {
      id: 'Historical status',
      title: 'Historical status',
      type: 'item',
      url: '/history',
      icon: icons.HistoryOutlined,
      breadcrumbs: false
    },
    {
      id: 'All customers',
      title: 'All customers',
      type: 'item',
      url: '/data_to_track',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'Rapport',
      title: 'Rapport',
      type: 'item',
      url: '/rapport',
      icon: icons.FileOutlined,
      breadcrumbs: false
    }
  ]
};

export default operation;
