import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useRegisterMutation } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { motion } from "framer-motion"; // Import Framer Motion

// Validation schema for the form
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterMutation(); // RTK Query mutation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const requestData = { ...data, active: true };
      // Call the register API
      const response = await registerUser(requestData).unwrap();
      console.log("Registration successful:", response);

      // Show success toast notification
      toast.success("Registration successful! Please log in.");

      // Redirect to login or dashboard
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);

      // Show error toast notification
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <ResponsiveAppBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark backdrop
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            width: "100%",
            maxWidth: "400px", // Make sure it's responsive
            zIndex: 1100, // Ensure the modal is on top of the backdrop
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{ marginTop: 2 }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </Button>
            </motion.div>
          </form>

          <Typography align="center" sx={{ marginTop: 3, color: "text.secondary" }}>
            Already have an account?
          </Typography>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleNavigateToLogin}
              sx={{
                marginTop: 1,
                borderColor: "text.secondary",
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  borderColor: "text.primary",
                  color: "text.primary",
                },
              }}
            >
              Login
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Register;
