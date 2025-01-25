import React, { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useGetPnLQuery } from "../../service/apiService";  // Import the new hook from RTK Query
import ResponsiveAppBar from "../../components/Navbar/Navbar";  // Assuming you have a Navbar
import { motion } from "framer-motion"; // Import Framer Motion

const ProfitAndLoss: React.FC = () => {
  // Fetch PnL data using RTK Query hook with an empty object as the argument
  const { data, error, isLoading } = useGetPnLQuery({});

  useEffect(() => {
    if (error) {
      console.error("Error fetching PnL:", error);
    }
  }, [error]);

  return (
    <>
      <ResponsiveAppBar /> {/* Navbar stays on top */}

      <Box
        sx={{
          maxWidth: 600,
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
            Profit and Loss (PnL)
          </Typography>

          {isLoading ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress size={50} />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">
              Error fetching PnL data
            </Typography>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Box sx={{ marginTop: "2rem" }}>
                <Typography variant="h6">
                  {`Current Value: ${data?.data.currentValue}`}
                </Typography>
                <Typography variant="h6">
                  {`Cost Basis: ${data?.data.costBasis}`}
                </Typography>
                <Typography
                  variant="h6"
                  color={data?.data.profitOrLoss >= 0 ? "success.main" : "error.main"}
                >
                  {`Profit/Loss: ${data?.data.profitOrLoss}`}
                </Typography>
              </Box>
            </motion.div>
          )}
        </motion.div>
      </Box>
    </>
  );
};

export default ProfitAndLoss;
