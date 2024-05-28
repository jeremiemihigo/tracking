import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import ErrorBoundary from 'ErrorBoundary';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// project import
import ContexteGlobal from 'GlobalContext';
import { store } from 'store';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ReduxProvider store={store}>
    <ContexteGlobal>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ContexteGlobal>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();