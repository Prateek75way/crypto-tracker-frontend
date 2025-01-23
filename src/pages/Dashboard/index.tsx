import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { useGetPortfolioQuery } from "../../service/apiService"; // Import the query hook

const Dashboard: React.FC = () => {
  // Use the RTK Query hook to fetch portfolio data
  const { data, error, isLoading } = useGetPortfolioQuery();

  const portfolio = data?.data?.portfolio || []; // Access the portfolio data from the API response

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ padding: "2rem", maxWidth: "1200px", margin: "auto" }}>
        <Typography variant="h4" gutterBottom>
          My Portfolio
        </Typography>

        {error && (
          <Typography color="error">
            Failed to fetch portfolio. Please try again later.
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cryptocurrency</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Current Price</TableCell>
                <TableCell align="right">Total Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                // Skeleton loading for the table rows
                Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" width="40%" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" width="40%" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" width="40%" />
                    </TableCell>
                  </TableRow>
                ))
              ) : portfolio.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No cryptocurrencies in your portfolio.
                  </TableCell>
                </TableRow>
              ) : (
                portfolio.map((crypto: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{crypto.symbol.toUpperCase()}</TableCell>
                    <TableCell align="right">{crypto.amount}</TableCell>
                    <TableCell align="right">
                      {crypto.currentPrice.toFixed(2)} USD
                    </TableCell>
                    <TableCell align="right">
                      {crypto.totalValue.toFixed(2)} USD
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Dashboard;