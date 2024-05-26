/* eslint-disable react-hooks/exhaustive-deps */
// project import
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollTop from 'components/ScrollTop';
import React from 'react';
import { useSelector } from 'react-redux';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import { useNavigate } from '../node_modules/react-router-dom/dist/index';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const navigation = useNavigate();

  const main = useSelector((state) => state.main?.main);
  React.useEffect(() => {
    if (main === 'token expired') {
      localStorage.removeItem('auth');
      navigation('/login', { replace: true });
    }
  }, [main]);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
