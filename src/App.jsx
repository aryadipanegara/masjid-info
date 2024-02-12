// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import Router from "./src/router/route";

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
