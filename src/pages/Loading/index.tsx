import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react'

const Loading = () => {
    return (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
            zIndex: 9999,
          }}
        >
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="white"
              sx={{ textAlign: "center" }}
            >
              Crypto Tracker
            </Typography>
            <CircularProgress size={40} sx={{ color: "white" }} />
          </motion.div>
        </Box>
      );
}

export default Loading