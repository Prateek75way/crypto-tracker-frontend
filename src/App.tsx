import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./pages/PageNotFound";
import Loading from "./pages/Loading";

// Lazy load the components
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const Register = React.lazy(() => import("./pages/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Transaction = React.lazy(() => import("./pages/Transaction"));
const Transfer = React.lazy(() => import("./pages/Transfer"));
const ProfitAndLoss = React.lazy(() => import("./pages/ProfitAndLoss"));
const ForgotPassword = React.lazy(() => import("./pages/Change-Password"));
const Prices = React.lazy(() => import("./pages/Prices"));
const PasswordReset = React.lazy(() => import("./pages/Password-Reset"));

const App: React.FC = () => {
  return ( 
    <Router>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/get-prices" element={<Prices />} />
          
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
               <ProtectedRoute>
                <Dashboard />
               </ProtectedRoute> 
            }
          />
          <Route
            path="/buy"
            element={
              <ProtectedRoute>
                <Transaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transfer"
            element={
              <ProtectedRoute>
                <Transfer />
              </ProtectedRoute>
            }
          />
          <Route
            path="profit-and-loss"
            element={
              <ProtectedRoute>
                <ProfitAndLoss />
              </ProtectedRoute>
            }
          />
          <Route
            path="change-password"
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />

          {/* Home route is public */}
          <Route path="/" element={<Home />} />

          {/* 404 page */}
          <Route
            path="*"
            element={
              <PageNotFound />
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
