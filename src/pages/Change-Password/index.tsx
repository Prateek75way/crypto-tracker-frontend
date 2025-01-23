import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useForgotPasswordMutation } from "../../service/apiService";  // Assuming you imported the hook here
import ResponsiveAppBar from "../../components/Navbar/Navbar";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [forgotPassword, { isLoading, error, data }] = useForgotPasswordMutation(); // RTK Mutation hook

  useEffect(() => {
    // Retrieve email from localStorage and set it to the state
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      await forgotPassword(email).unwrap(); // Use RTK's `unwrap` to handle success/failure
    } catch (err) {
      console.error("Error during password reset", err);
    }
  };

  return (
    <>
    <ResponsiveAppBar />
    <Box sx={{ maxWidth: 400, margin: "auto", marginTop: "2rem", padding: "2rem", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Change Password
      </Typography>

      <Typography variant="body1">
        A password reset link will be sent to your email.
      </Typography>

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        margin="normal"
        value={email}
        disabled
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
        sx={{ marginTop: 2 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
      </Button>

      {error && <Typography color="error" sx={{ marginTop: 2 }}>Facing some dificulty</Typography>}
      {data && !error && <Typography color="success" sx={{ marginTop: 2 }}>Check your email for the reset link.</Typography>}
    </Box>
    </>
  );
};

export default ForgotPassword;
