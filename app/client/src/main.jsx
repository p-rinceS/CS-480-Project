import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet, Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header.jsx";

import App from "./pages/App/App.jsx";
import Home from "./pages/Home/Home.jsx";
import Test from "./pages/Test/Test.jsx";
import Clients from "./pages/Clients/Clients.jsx";
import Login from "./pages/Login/Login.jsx";
import getCookie from "./utils/getCookie.js";




const isAuthenticated = () => {
    return !!getCookie("role"); // Check if the 'role' cookie exists
};

// PrivateRoute component
const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Shows header on every page
const PageLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

// Usage in routes
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/app" element={<PrivateRoute><App /></PrivateRoute>} />
                    <Route path="/test" element={<PrivateRoute><Test /></PrivateRoute>} />
                    <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </Router>
    </StrictMode>
);