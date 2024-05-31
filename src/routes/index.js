import React from 'react';
import { useRoutes } from 'react-router-dom';

// project import
import { useSelector } from 'react-redux';
import AdminRoute from './AdminRoute';
import LoginRoutes from './LoginRoutes';
import RouteNonAdmin from './NonAdmin';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const user = useSelector((state) => state.user?.user);
  const [routes, setRoutes] = React.useState([]);

  React.useEffect(() => {
    if (user) {
      let table = [];
      if (user?.fonction === 'admin') {
        table = [AdminRoute, LoginRoutes];
      } else {
        table = [RouteNonAdmin, LoginRoutes];
      }
      setRoutes(table);
    }
  }, [user]);
  return useRoutes(routes);
}
