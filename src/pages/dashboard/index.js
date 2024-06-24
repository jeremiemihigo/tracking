import Box from '@mui/material/Box';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.css';
import Tabs from 'components/Tabs';
import Dashoard from './Dashboard';
import TakeAction from './TabAction';
import './style.css';

function TextMobileStepper() {
  const titres = [
    { id: 0, label: 'Dashboard' },
    { id: 1, label: 'Status' }
  ];
  const component = [
    { id: 0, component: <Dashoard /> },
    { id: 1, component: <TakeAction /> }
  ];

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <Tabs titres={titres} components={component} />
    </Box>
  );
}
export default TextMobileStepper;
