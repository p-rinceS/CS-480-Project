import { createRoot } from "react-dom/client";
import "./index.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header.jsx";

import Home from "./pages/Home/Home.jsx";
import Clients from "./pages/Clients/Clients.jsx";
import Login from "./pages/Login/Login.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import getCookie from "./utils/getCookie.js";
import PaymentInfo from "./pages/Clients/client-pages/PaymentInfo/PaymentInfo.jsx";
import ManageCarModels from "./pages/Managers/ManageCarModels/ManageCarModels.jsx";
import ManageClients from "./pages/Managers/ManageClients/ManageClients.jsx";
import ManageDrivers from "./pages/Managers/ManageDrivers/ManageDrivers.jsx";
import BookRent from "./pages/Clients/client-pages/ViewAvailableCars/BookRent.jsx";
import RentalHistory from "./pages/Clients/client-pages/RentalHistory/RentalHistory.jsx";
import WriteReviews from "./pages/Clients/client-pages/WriteReviews/WriteReviews.jsx";
import ManageCars from './pages/Drivers/ManageCars/ManageCars.jsx';
import ManageAddress from './pages/Drivers/ManageAddress/ManageAddress.jsx';

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
    <div id="page">
      <Outlet />
    </div>
  </>
);

// Usage in routes
createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route element={<PageLayout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-car-models"
          element={
            <PrivateRoute>
              <ManageCarModels />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-clients"
          element={
            <PrivateRoute>
              <ManageClients />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-drivers"
          element={
            <PrivateRoute>
              <ManageDrivers />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-info"
          element={
            <PrivateRoute>
              <PaymentInfo />
            </PrivateRoute>
          }
        />
        <Route
          path={"/book-rent"}
          element={
            <PrivateRoute>
              <BookRent />
            </PrivateRoute>
          }
        />
        <Route
          path={"/rent-history"}
          element={
            <PrivateRoute>
              <RentalHistory />
            </PrivateRoute>
          }
        />
        <Route path={'/write-a-review'} element={<PrivateRoute><WriteReviews/></PrivateRoute>}></Route>
        <Route
          path={"/manage-cars"}
          element={
            <ManageCars />
          }
        />
        <Route
          path={"/manage-address"}
          element={
            <ManageAddress />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Route>
    </Routes>
  </Router>
);
