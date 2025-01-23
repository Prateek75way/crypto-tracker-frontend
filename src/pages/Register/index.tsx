import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Typography, Box, CircularProgress, createStyles } from "@mui/material";
import { useRegisterMutation } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "../../components/Navbar/Navbar";



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
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          marginTop: "2rem",
          padding: "2rem",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
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
        </form>
        <Typography align="center" sx={{ marginTop: 3, color: "text.secondary" }}>
          Already have an account?
        </Typography>
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
      </Box>
    </>
  );
};


export default Register;
