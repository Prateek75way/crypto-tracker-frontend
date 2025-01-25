import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Animated 404 Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "4rem", md: "6rem" },
            color: "#3f51b5",
          }}
        >
          404
        </Typography>
      </motion.div>

      {/* Animated Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 2,
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            color: "#616161",
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>
      </motion.div>

      {/* Animated Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <Typography
          variant="body1"
          sx={{
            marginBottom: 4,
            fontSize: { xs: "1rem", md: "1.2rem" },
            color: "#757575",
          }}
        >
          It seems you wandered into the void. Let's get you back on track!
        </Typography>
      </motion.div>

      {/* Animated Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/"
          sx={{
            textTransform: "none",
            padding: { xs: "8px 16px", md: "12px 24px" },
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          Go to Home
        </Button>
      </motion.div>

      {/* Decorative Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: "300px",
          height: "300px",
          backgroundColor: "#3f51b5",
          borderRadius: "50%",
          zIndex: -1,
        }}
      />
    </Container>
  );
};

export default PageNotFound;
