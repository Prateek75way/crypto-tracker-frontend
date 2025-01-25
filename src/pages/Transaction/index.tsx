import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateTransactionMutation } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { motion } from "framer-motion"; // Import Framer Motion

const Transaction: React.FC = () => {
  const [symbol, setSymbol] = useState<string>("");
  const [type, setType] = useState<string>("BUY");
  const [amount, setAmount] = useState<number | "">("");
  const navigate = useNavigate();

  const [
    createTransaction,
    { isLoading },
  ] = useCreateTransactionMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!symbol || !type || !amount) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await createTransaction({
        symbol,
        type,
        amount: Number(amount),
      }).unwrap();

      toast.success("Transaction created successfully!");
      setSymbol("");
      setAmount("");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to create transaction. Please try again.");
      console.error("Error creating transaction:", err);
    }
  };

  return (
    <>
      <ResponsiveAppBar /> {/* Navbar stays on top */}
      
      <ToastContainer />

      {/* Form Modal Content with Animation */}
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
          maxWidth: "400px", // Responsive width
          margin: "auto",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Create Transaction
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Animated Inputs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TextField
              label="Cryptocurrency Symbol"
              variant="outlined"
              fullWidth
              margin="normal"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TextField
              select
              label="Transaction Type"
              variant="outlined"
              fullWidth
              margin="normal"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <MenuItem value="BUY">BUY</MenuItem>
              <MenuItem value="SELL">SELL</MenuItem>
            </TextField>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TextField
              label="Amount"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </motion.div>

          {/* Submit Button Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Box>
          </motion.div>
        </form>
      </motion.div>
    </>
  );
};

export default Transaction;
