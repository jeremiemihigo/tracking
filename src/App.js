/* eslint-disable react-hooks/exhaustive-deps */
// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import React from 'react';
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
