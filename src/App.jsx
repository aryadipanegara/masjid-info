import { BrowserRouter } from "react-router-dom";
import Router from "./router/route";
import MaintenancePage from "./pages/MaintenancePage";
import isMaintenanceMode from "./components/maintenanceConfig";

export default function App() {
  return (
    <BrowserRouter>
      {isMaintenanceMode ? <MaintenancePage /> : <Router />}
    </BrowserRouter>
  );
}
