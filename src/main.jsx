import ReactDOM from "react-dom";
import App from "./App";
import MaintenancePage from "./pages/MaintenancePage";
import "./index.css";
import isMaintenanceMode from "./components/maintenanceConfig";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  isMaintenanceMode ? <MaintenancePage /> : <App />
);
