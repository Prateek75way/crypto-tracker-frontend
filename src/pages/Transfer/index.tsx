import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useTransferCryptoMutation } from "../../service/apiService"; // RTK Mutation for transfer
import { toast } from "react-toastify"; // For notifications
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

interface TransferFormInputs {
  senderId: string;
  receiverId: string;
  symbol: string;
  amount: number;
}

const Transfer: React.FC = () => {
  const navigate = useNavigate();
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [transfer, { isLoading, isSuccess, isError, error }] = useTransferCryptoMutation(); // Using RTK mutation

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TransferFormInputs>();

  // Fetch senderId from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setValue("senderId", user._id); // Set the senderId to the stored user id
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<TransferFormInputs> = async (data) => {
    // Parse the amount to a number
    const transferData = {
      ...data,
      amount: parseFloat(data.amount.toString()), // Ensure amount is a number
    };

    try {
      const response = await transfer(transferData).unwrap();
      toast.success(response.message); // Display success notification
      setTransferSuccess(true);
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error?.data?.message || "Transfer failed. Please try again.");
      toast.error(errorMessage); // Display error message
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              maxWidth: 500,
              width: "100%",
              padding: "2rem",
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: 4,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              fontWeight="bold"
              color="primary"
            >
              Transfer Cryptocurrency
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Sender ID Field */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <TextField
                  fullWidth
                  label="Sender ID"
                  margin="normal"
                  value={localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")!)._id : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </motion.div>

              {/* Receiver ID Field */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <TextField
                  fullWidth
                  label="Receiver ID"
                  margin="normal"
                  {...register("receiverId", { required: "Receiver ID is required" })}
                  error={!!errors.receiverId}
                  helperText={errors.receiverId?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </motion.div>

              {/* Crypto Symbol Field */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <TextField
                  fullWidth
                  label="Crypto Symbol (e.g., BTC)"
                  margin="normal"
                  {...register("symbol", { required: "Crypto symbol is required" })}
                  error={!!errors.symbol}
                  helperText={errors.symbol?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </motion.div>

              {/* Amount Field */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  margin="normal"
                  {...register("amount", { required: "Amount is required", min: 1 })}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{
                    marginTop: 2,
                    borderRadius: 2,
                    padding: "12px 0",
                    fontWeight: "bold",
                    background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)",
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Transfer"
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Success Message */}
            {transferSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Typography
                  color="success.main"
                  sx={{ marginTop: 2, textAlign: "center", fontWeight: "bold" }}
                >
                  Transfer Successful! 🎉
                </Typography>
              </motion.div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <Typography
                  color="error"
                  sx={{ marginTop: 2, textAlign: "center", fontWeight: "bold" }}
                >
                  {errorMessage}
                </Typography>
              </motion.div>
            )}
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default Transfer;