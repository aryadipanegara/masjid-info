import { BrowserRouter } from "react-router-dom";
import Router from "./src/router/route";
import MaintenancePage from "./src/pages/MaintenancePage";
import isMaintenanceMode from "./src/components/maintenanceConfig";

export default function App() {
  return (
    <BrowserRouter>
      {isMaintenanceMode ? <MaintenancePage /> : <Router />}
    </BrowserRouter>
  );
}
