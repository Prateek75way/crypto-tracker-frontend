import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useLoginMutation } from "../../service/apiService";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setTokens, setError } from "../../store/reducers/authSlice";
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"; // Import Framer Motion

// Validation schema using Yup
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login(data).unwrap();
      console.log("Login successful:", response.data.accessToken);

      // Dispatch tokens and user data
      toast.success("Login successful!");
      dispatch(
        setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          user: response.data.user, // Pass user from API response
        })
      );

      // Show success notification
      window.location.href = "/";
    } catch (error: any) {
      dispatch(setError(error.data?.message || "Login failed"));

      // Show error notification
      toast.error(error.data?.message || "Login failed");
    }
  };

  const handleCreateAccount = () => {
    window.location.href = "/register"; // Redirect to the signup page
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
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
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
              transition={{ delay: 0.4 }}
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
              transition={{ delay: 0.6 }}
            >
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{ marginTop: 2 }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </motion.div>
          </form>

          <Typography align="center" sx={{ marginTop: 3, color: "text.secondary" }}>
            Don’t have an account?
          </Typography>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleCreateAccount}
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
              Create New Account
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
