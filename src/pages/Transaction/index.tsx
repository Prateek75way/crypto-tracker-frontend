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
      <ResponsiveAppBar />
      {/* Toast Container for Notifications */}
      

     <Box sx={{ maxWidth: 400, margin: "auto", marginTop: "2rem", padding: "2rem", boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Create Transaction
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Cryptocurrency Symbol"
            variant="outlined"
            fullWidth
            margin="normal"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
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
        </form>
      </Box>
    </>
  );
};

export default Transaction;
