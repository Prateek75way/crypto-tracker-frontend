import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
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
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
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

      // Dispatch tokens and user data
      dispatch(
        setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          user: response.data.user, // Include user data
        })
      );

      // Show success notification
      toast.success("Login successful!");

      // Redirect to the homepage or dashboard
      window.location.href = "/";
    } catch (error: any) {
      // Handle error
      dispatch(setError(error.data?.message || "Login failed"));
      toast.error(error.data?.message || "Invalid credentials");
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
            maxWidth: "400px",
            zIndex: 1100,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            fontWeight="bold"
            color="primary"
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
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
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                }}
              />
            </motion.div>

            {/* Password Field */}
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
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{
                    padding: "12px 24px",
                    fontWeight: "bold",
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)",
                    },
                  }}
                >
                  {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
                </Button>
              </Box>
            </motion.div>
          </form>

          <Typography align="center" sx={{ marginTop: 3, color: "text.secondary" }}>
            Don’t have an account?
          </Typography>

          {/* Create Account Button */}
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
                mt: 1,
                borderRadius: 2,
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
