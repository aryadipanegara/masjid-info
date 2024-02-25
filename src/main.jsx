import ReactDOM from 'react-dom';
import App from './App';
import MaintenancePage from './src/pages/MaintenancePage';
import "./index.css";
import isMaintenanceMode from './src/components/maintenanceConfig';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  isMaintenanceMode ? <MaintenancePage /> : <App />
);
