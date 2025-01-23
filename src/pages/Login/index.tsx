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
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
        <Typography align="center" sx={{ marginTop: 3, color: "text.secondary" }}>
          Don’t have an account?
        </Typography>
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
      </Box>
    </>
  );
};


export default Login;
