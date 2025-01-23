// src/pages/Prices/Prices.tsx

import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Box, TextField, Button } from "@mui/material";
import { useFetchPricesQuery } from "../../service/apiService"; // Import the fetchPrices query
import ResponsiveAppBar from "../../components/Navbar/Navbar";

const Prices: React.FC = () => {
    const [symbols, setSymbols] = useState<string[]>(["bitcoin", "ethereum"]); // Default symbols as an array
    const [currency, setCurrency] = useState("usd"); // Default currency
    const { data, error, isLoading } = useFetchPricesQuery({ symbols, currency }); // Fetch prices based on symbols and currency
  
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
        <Typography variant="h4" gutterBottom align="center">
          Cryptocurrency Prices
        </Typography>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ textAlign: "center", marginBottom: "20px" }}>
          <TextField
            name="symbols"
            label="Enter symbols (comma-separated)"
            variant="outlined"
            defaultValue={symbols}
            sx={{ width: "300px", marginRight: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </form>

        {isLoading && (
          <Box display="flex" justifyContent="center" marginTop={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" align="center" marginTop={2}>
            Error fetching prices
          </Typography>
        )}
        {console.log(data)}
        
        {data && (
          <Grid container spacing={4} justifyContent="center" marginTop={2}>
            {Object.entries(data.data).map(([symbol, priceData]) => (
              <Grid item xs={12} sm={6} md={4} key={symbol}>
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
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Prices;