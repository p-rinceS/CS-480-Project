import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header/Header.jsx";

import App from "./pages/App/App.jsx";
import Home from "./pages/Home/Home.jsx";
import Test from "./pages/Test/Test.jsx";
import Clients from "./pages/Clients/Clients.jsx";

// Shows header on every page
const PageLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<App />} />
          <Route path="/test" element={<Test />} />
            <Route path="/clients" element={<Clients/>} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
