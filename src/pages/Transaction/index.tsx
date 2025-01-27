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

  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

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

      {/* Gradient Background */}
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
        {/* Form Container with Glassmorphism Effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            width: "100%",
            maxWidth: "400px", // Responsive width
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
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
                  sx={{
                    borderRadius: 2,
                    padding: "12px 24px",
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
                    "Submit"
                  )}
                </Button>
              </Box>
            </motion.div>
          </form>
        </motion.div>
      </Box>
    </>
  );
};

export default Transaction;