import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { motion } from "framer-motion"; // Import Framer Motion
import { useAppSelector } from "../../hooks/reduxHooks"; // Import the custom hook to access the state

const Home: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth); // Get authentication status from Redux store
  const [isSplashVisible, setSplashVisible] = useState(true);

  // Check if user is in localStorage
  const isUserInLocalStorage = localStorage.getItem("User");

  // Hide the splash screen after 3 seconds, but only if no user in localStorage
  useEffect(() => {
    if (!isUserInLocalStorage) {
      const timer = setTimeout(() => {
        setSplashVisible(false);
      }, 3000); // Splash screen stays visible for 3 seconds

      return () => clearTimeout(timer);
    } else {
      setSplashVisible(false); // Skip splash screen if user is found
    }
  }, [isUserInLocalStorage]);

  return (
    <>
      {/* Splash Screen */}
      {isSplashVisible && !isUserInLocalStorage && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#3f51b5", // Background color
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <motion.div
            style={{ display: "flex", alignItems: "center" }} // Flexbox for horizontal alignment
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }} // Start position and opacity
              animate={{ x: 0, opacity: 1 }} // End position and opacity
              transition={{ duration: 0.5 }} // Animation duration
            >
              <Typography variant="h3" color="white">
                Crypto
              </Typography>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }} // Start position and opacity
              animate={{ x: 0, opacity: 1 }} // End position and opacity
              transition={{ duration: 0.5, delay: 0.5 }} // Delay for the second text
            >
              <Typography variant="h3" color="white" style={{ marginLeft: '10px' }}>
                Tracker
              </Typography>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Main content */}
      {!isSplashVisible && (
        <>
          <ResponsiveAppBar />
          <Container sx={{ marginTop: 4 }}>
            {/* Hero Section */}
            <Box sx={{ textAlign: "center", marginBottom: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <Typography variant="h3" gutterBottom>
                  Welcome to Crypto Tracker
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
              >
                <Typography variant="h6" paragraph>
                  Track your cryptocurrency investments and manage your portfolio with ease.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
              >
                <Button variant="contained" color="primary" component={Link} to="/dashboard">
                  Get Started
                </Button>
              </motion.div>
            </Box>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, delay: 0.6 }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                Features
              </Typography>
            </motion.div>

            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  title: "Real-Time Prices",
                  description: "Get the latest prices for your favorite cryptocurrencies.",
                  link: "/get-prices",
                },
                {
                  title: "Portfolio Management",
                  description: "Manage your crypto portfolio and track your investments.",
                  link: "/dashboard",
                },
                {
                  title: "Transfer Crypto",
                  description: "Easily transfer cryptocurrencies between accounts.",
                  link: "/transfer",
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }} // Scale effect on hover
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }} // Staggered animation for each feature
                  >
                    <Card>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" component={Link} to={feature.link}>
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Call to Action Section */}
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.8 }}
              >
                <Typography variant="h5" gutterBottom>
                  {isAuthenticated
                    ? "You're all set! Start managing your crypto portfolio."
                    : "Ready to take control of your crypto investments?"}
                </Typography>
              </motion.div>

              {/* Conditionally render the Sign Up Now button */}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 50, delay: 1 }}
                >
                  <Button variant="contained" color="primary" component={Link} to="/register">
                    Sign Up Now
                  </Button>
                </motion.div>
              )}
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
