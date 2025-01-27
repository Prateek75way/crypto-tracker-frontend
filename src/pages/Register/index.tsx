import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useRegisterMutation } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { motion } from "framer-motion";

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
  const [registerUser, { isLoading }] = useRegisterMutation();

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
      const response = await registerUser(requestData).unwrap();
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <ToastContainer />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark backdrop
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "1rem",
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
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            width: "100%",
            maxWidth: "450px",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(135deg, #3f51b5, #2196f3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Account
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
                sx={{
                  marginTop: 2,
                  padding: "10px 20px",
                  background: "linear-gradient(135deg, #3f51b5, #2196f3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2196f3, #3f51b5)",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Register"
                )}
              </Button>
            </motion.div>
          </form>

          <Typography
            align="center"
            sx={{
              marginTop: 3,
              color: "text.secondary",
              fontSize: "0.9rem",
            }}
          >
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
              onClick={() => navigate("/login")}
              sx={{
                marginTop: 1,
                borderColor: "text.secondary",
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              Login
            </Button>
          </motion.div>
        </motion.div>
      </Box>
    </>
  );
};

export default Register;
