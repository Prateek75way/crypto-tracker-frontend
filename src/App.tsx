import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import { ToastContainer } from "react-toastify";
import Transfer from "./pages/Transfer";
import ProfitAndLoss from "./pages/ProfitAndLoss";
import ForgotPassword from "./pages/Change-Password";
import Prices from "./pages/Prices";
import PasswordReset from "./pages/Password-Reset";


const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<Transaction />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="profit-and-loss" element={<ProfitAndLoss />} />
        <Route path ="change-password" element={<ForgotPassword />} />
        <Route path="/get-prices" element ={ <Prices /> } />
        <Route path="/reset-password" element={<PasswordReset />}/>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <h1>404 - Page Not Found</h1>
              <a href="/">Go to Home</a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
