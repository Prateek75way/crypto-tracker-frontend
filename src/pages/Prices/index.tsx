// src/pages/Prices/Prices.tsx

import React, { useState } from "react";
import { Container, Typography, Grid, Card, CardContent, TextField, Button, Skeleton } from "@mui/material";
import { useFetchPricesQuery } from "../../service/apiService"; // Import the fetchPrices query
import ResponsiveAppBar from "../../components/Navbar/Navbar";
import { motion } from "framer-motion"; // Import Framer Motion

const Prices: React.FC = () => {
  const [symbols, setSymbols] = useState<string[]>(["bitcoin", "ethereum"]); // Default symbols as an array
  const [currency, setCurrency] = useState("usd"); // Default currency
  const { data, error, isLoading } = useFetchPricesQuery({ symbols }); // Fetch prices based on symbols and currency

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputSymbols = form.elements.namedItem("symbols") as HTMLInputElement;
    setSymbols(inputSymbols.value.split(',')); // Update symbols state with user input as an array
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container sx={{ marginTop: 4 }}>
        {/* Title with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Cryptocurrency Prices
          </Typography>
        </motion.div>

        {/* Search Bar with animation */}
        <motion.form
          onSubmit={handleSearch}
          style={{ textAlign: "center", marginBottom: "20px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TextField
            name="symbols"
            label="Enter symbols (comma-separated)"
            variant="outlined"
            defaultValue={symbols.join(", ")} // Default value as a string
            sx={{ width: "300px", marginRight: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </motion.form>

        {/* Skeleton Loading while data is loading */}
        {isLoading ? (
          <Grid container spacing={4} justifyContent="center" marginTop={2}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="60%" height={40} sx={{ marginTop: 1 }} />
                <Skeleton variant="text" width="80%" height={30} sx={{ marginTop: 0.5 }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          // Error message
          error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Typography color="error" align="center" marginTop={2}>
                Error fetching prices
              </Typography>
            </motion.div>
          )
        )}

        {/* Data cards animation */}
        {!isLoading && data && (
          <Grid container spacing={4} justifyContent="center" marginTop={2}>
            {Object.entries(data.data).map(([symbol, priceData]) => (
              <Grid item xs={12} sm={6} md={4} key={symbol}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {symbol.toUpperCase()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${priceData.usd}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Prices;