import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const PasswordReset = () => {
    const { token: routeToken } = useParams(); // For route parameters
    const location = useLocation(); // For query parameters
    const [token, setToken] = useState<string | null>(null); // State to hold the token
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Set the token from route or query parameters
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const queryToken = queryParams.get("token");

        // Set the token state based on the available token
        if (queryToken) {
            setToken(queryToken);
        } else if (routeToken) {
            setToken(routeToken);
        }
    }, [location.search, routeToken]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); // Reset error state

        try {
            const response = await axios.post("http://localhost:8000/api/users/reset-password", {
                token, // Use the token from state
                newPassword,
            });
            setSuccess(true);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to reset password.");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "auto", marginTop: "2rem", padding: "2rem", boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Reset Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Button fullWidth type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Reset Password
                </Button>
            </form>

            {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ marginTop: 2 }}>Password has been reset successfully!</Alert>}
        </Box>
    );
};

export default PasswordReset;