import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/reduxHooks";
import { TrendingUp, SwapHoriz, ExpandMore, Facebook, Twitter, LinkedIn } from "@mui/icons-material"; // Import icons
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const Home: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isSplashVisible, setSplashVisible] = useState(true);
  const isUserInLocalStorage = localStorage.getItem("User");

  useEffect(() => {
    if (!isUserInLocalStorage) {
      const timer = setTimeout(() => {
        setSplashVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setSplashVisible(false);
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
            background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <motion.div
            style={{ display: "flex", alignItems: "center" }}
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" color="white" fontWeight="bold">
                Crypto
              </Typography>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Typography variant="h3" color="white" fontWeight="bold" style={{ marginLeft: '10px' }}>
                Tracker
              </Typography>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      {!isSplashVisible && (
        <>
          <ResponsiveAppBar />
          <Container sx={{ marginTop: 4 }}>
            {/* Hero Section */}
            <Box
              sx={{
                textAlign: "center",
                marginBottom: 8,
                padding: 6,
                background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                borderRadius: 4,
                color: "white",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <Typography variant="h3" gutterBottom fontWeight="bold">
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
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/dashboard"
                  size="large"
                  sx={{ fontWeight: "bold", borderRadius: 2 }}
                >
                  Get Started
                </Button>
              </motion.div>
            </Box>

            {/* Statistics Section */}
            <Box sx={{ textAlign: "center", marginBottom: 8 }}>
              <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                Why Choose Us?
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {[
                  { value: "1M+", label: "Active Users" },
                  { value: "$10B+", label: "Transactions" },
                  { value: "100+", label: "Supported Cryptos" },
                ].map((stat, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card
                        sx={{
                          padding: 4,
                          borderRadius: 4,
                          boxShadow: 3,
                          background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                          color: "white",
                        }}
                      >
                        <Typography variant="h3" fontWeight="bold">
                          {stat.value}
                        </Typography>
                        <Typography variant="h6">{stat.label}</Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, delay: 0.6 }}
            >
              <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
                Features
              </Typography>
            </motion.div>

            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  title: "Real-Time Prices",
                  description: "Get the latest prices for your favorite cryptocurrencies.",
                  link: "/get-prices",
                  icon: <TrendingUp fontSize="large" color="primary" />,
                },
                {
                  title: "Portfolio Management",
                  description: "Manage your crypto portfolio and track your investments.",
                  link: "/dashboard",
                  icon: <AssignmentIndIcon fontSize="large" color="primary" />,
                },
                {
                  title: "Transfer Crypto",
                  description: "Easily transfer cryptocurrencies between accounts.",
                  link: "/transfer",
                  icon: <SwapHoriz fontSize="large" color="primary" />,
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: 4,
                        boxShadow: 3,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h5" component="div" fontWeight="bold" color="primary" align="center">
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "center", marginBottom: 2 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          component={Link}
                          to={feature.link}
                          sx={{ borderRadius: 2 }}
                        >
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Testimonials Section */}
            <Box sx={{ textAlign: "center", marginTop: 8, marginBottom: 8 }}>
              <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                What Our Users Say
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    name: "John Doe",
                    testimonial: "Crypto Tracker has made managing my portfolio so easy! Highly recommended.",
                  },
                  {
                    name: "Jane Smith",
                    testimonial: "The real-time prices feature is a game-changer. Love it!",
                  },
                  {
                    name: "Alex Johnson",
                    testimonial: "Great platform for both beginners and experts. Very intuitive.",
                  },
                ].map((testimonial, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card
                        sx={{
                          padding: 4,
                          borderRadius: 4,
                          boxShadow: 3,
                        }}
                      >
                        <Typography variant="body1" fontStyle="italic" sx={{ mb: 2 }}>
                          "{testimonial.testimonial}"
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          - {testimonial.name}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* FAQ Section */}
            <Box sx={{ marginBottom: 8 }}>
              <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
                Frequently Asked Questions
              </Typography>
              {[
                {
                  question: "How do I get started?",
                  answer: "Simply sign up, connect your wallet, and start tracking your crypto investments.",
                },
                {
                  question: "Is Crypto Tracker free?",
                  answer: "Yes, our basic features are free to use. We also offer premium plans for advanced features.",
                },
                {
                  question: "Can I track multiple wallets?",
                  answer: "Absolutely! You can connect and track multiple wallets in one place.",
                },
              ].map((faq, index) => (
                <Accordion key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            {/* Newsletter Section */}
            <Box
              sx={{
                textAlign: "center",
                padding: 6,
                background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                borderRadius: 4,
                color: "white",
                marginBottom: 8,
              }}
            >
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Subscribe to Our Newsletter
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Stay updated with the latest crypto trends and news.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <TextField
                  variant="outlined"
                  placeholder="Enter your email"
                  sx={{ background: "white", borderRadius: 2 }}
                />
                <Button variant="contained" color="secondary" sx={{ borderRadius: 2 }}>
                  Subscribe
                </Button>
              </Box>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                textAlign: "center",
                padding: 4,
                background: "#f5f5f5",
                borderRadius: 4,
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                Crypto Tracker
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
                <IconButton color="primary">
                  <Facebook />
                </IconButton>
                <IconButton color="primary">
                  <Twitter />
                </IconButton>
                <IconButton color="primary">
                  <LinkedIn />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                © 2023 Crypto Tracker. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;