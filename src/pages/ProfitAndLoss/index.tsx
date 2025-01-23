import React, { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useGetPnLQuery } from "../../service/apiService";  // Import the new hook from RTK Query
import ResponsiveAppBar from "../../components/Navbar/Navbar";  // Assuming you have a Navbar

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
      <ResponsiveAppBar />  {/* Your Navbar component */}
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
        <Typography variant="h4" gutterBottom>
          Profit and Loss (PnL)
        </Typography>
        {console.log(data)}
        {isLoading ? (
          <CircularProgress size={50} />
        ) : error ? (
          <Typography color="error">Error fetching PnL data</Typography>
        ) : (
                
          <Box sx={{ marginTop: "2rem" }}>
            <Typography variant="h6">{`Current Value: ${data?.data.currentValue}`}</Typography>
            <Typography variant="h6">{`Cost Basis: ${data?.data.costBasis}`}</Typography>
            <Typography
              variant="h6"
              color={data?.profitOrLoss >= 0 ? "success.main" : "error.main"}
            >
              {`Profit/Loss: ${data?.data.profitOrLoss}`}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProfitAndLoss;
