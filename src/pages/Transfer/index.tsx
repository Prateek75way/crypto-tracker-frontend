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

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TransferFormInputs>();

  // Fetch senderId from localStorage when the component mounts
  useEffect(() => {
    const storedUser  = localStorage.getItem("User");
    console.log(storedUser);
    
    if (storedUser) {
      const user = JSON.parse(storedUser );
      console.log(user._id);
      
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
      if (isSuccess) {
        toast.success(response.message); // Display success notification
        setTransferSuccess(true);
      }
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error?.message || "Transfer failed.");
      toast.error(errorMessage); // Display error message
    }
    
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Transfer Cryptocurrency
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
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
              />
            </motion.div>

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
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <TextField
                fullWidth
                label="Crypto Symbol (e.g. bitcoin)"
                margin="normal"
                {...register("symbol", { required: "Crypto symbol is required" })}
                error={!!errors.symbol}
                helperText={errors.symbol?.message}
              />
            </motion.div>

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
              />
            </motion.div>

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
                sx={{ marginTop: 2 }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Transfer"}
              </Button>
            </motion.div>
          </form>

          {transferSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Typography color="success.main" sx={{ marginTop: 2 }} align="center">
                Transfer Successful!
              </Typography>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <Typography color="error" sx={{ marginTop: 2 }} align="center">
                {errorMessage}
              </Typography>
            </motion.div>
          )}
        </motion.div>
      </Box>
    </>
  );
};

export default Transfer;