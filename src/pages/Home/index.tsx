import React from "react";
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { motion } from "framer-motion"; // Import Framer Motion

const Home: React.FC = () => {
  return (
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
              Ready to take control of your crypto investments?
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 1 }}
          >
            <Button variant="contained" color="primary" component={Link} to="/register">
              Sign Up Now
            </Button>
          </motion.div>
        </Box>
      </Container>
    </>
  );
};

export default Home;
