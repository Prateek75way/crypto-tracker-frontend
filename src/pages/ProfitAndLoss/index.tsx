import React, { useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useGetPnLQuery } from "../../service/apiService"; // Import the new hook from RTK Query
import ResponsiveAppBar from "../../components/Navbar/Navbar"; // Assuming you have a Navbar
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
              maxWidth: 600,
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
              Profit and Loss (PnL)
            </Typography>

            {isLoading ? (
              <Box sx={{ marginTop: "2rem" }}>
                <Skeleton variant="text" width="100%" height={40} />
                <Skeleton variant="text" width="100%" height={40} />
                <Skeleton variant="text" width="100%" height={40} />
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
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default ProfitAndLoss;