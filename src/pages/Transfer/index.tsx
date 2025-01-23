import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useAppDispatch } from "../../hooks/reduxHooks"; // Assuming redux is being used
import { useTransferCryptoMutation } from "../../service/apiService"; // RTK Mutation for transfer
import { toast } from "react-toastify"; // For notifications
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

interface TransferFormInputs {
  senderId: string;
  receiverId: string;
  symbol: string;
  amount: number;
}

const Transfer: React.FC = () => {
    const navigate = useNavigate()
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [transfer, { isLoading, isSuccess, isError, error }] = useTransferCryptoMutation(); // Using RTK mutation

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TransferFormInputs>();

  // Fetch senderId from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setValue("senderId", user._id); // Set the senderId to the stored user id
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<TransferFormInputs> = async (data) => {
    try {
      const response = await transfer(data).unwrap();
      
      if (isSuccess) {
        toast.success(response.message); // Display success notification
        setTransferSuccess(true);
      }toast.success(response.message);
      navigate("/")
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
      <Typography variant="h4" gutterBottom>
        Transfer Cryptocurrency
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Sender ID"
          margin="normal"
          value={localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")!)._id : ""}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          label="Receiver ID"
          margin="normal"
          {...register("receiverId", { required: "Receiver ID is required" })}
          error={!!errors.receiverId}
          helperText={errors.receiverId?.message}
        />
        <TextField
          fullWidth
          label="Crypto Symbol (e.g. bitcoin)"
          margin="normal"
          {...register("symbol", { required: "Crypto symbol is required" })}
          error={!!errors.symbol}
          helperText={errors.symbol?.message}
        />
        <TextField
          fullWidth
          label="Amount"
          type="number"
          margin="normal"
          {...register("amount", { required: "Amount is required", min: 1 })}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />
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
      </form>

      {transferSuccess && (
        <Typography color="success.main" sx={{ marginTop: 2 }}>
          Transfer Successful!
        </Typography>
      )}

      {errorMessage && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
    </>
  );
};

export default Transfer;
