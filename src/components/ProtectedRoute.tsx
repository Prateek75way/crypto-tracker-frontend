import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { checkLoginStatus } from "../store/reducers/authSlice";
import { motion } from "framer-motion"; // Import Framer Motion
import { Box, Typography, CircularProgress } from "@mui/material"; // Import Material-UI components

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkLoginStatus());
    }
  }, [dispatch, isAuthenticated]);

  // Splash Screen Animation
  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
          zIndex: 9999,
        }}
      >
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="white"
            sx={{ textAlign: "center" }}
          >
            Crypto Tracker
          </Typography>
          <CircularProgress size={40} sx={{ color: "white" }} />
        </motion.div>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render the protected children
  return children;
};

export default ProtectedRoute;