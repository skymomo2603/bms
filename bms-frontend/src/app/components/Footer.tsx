"use client";

import { Box, Divider, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        background: "linear-gradient(to right, #04355d 0%, #086fc3 63%)",
        color: "white",
        py: 2,
        px: 4,
      }}
    >
      {/* Thin horizontal line near the top */}
      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.3)",
          mb: 2,
        }}
      />

      {/* Content row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">
          ©2026 KsVill Hotel. All rights reserved.
        </Typography>
        <Typography variant="body2">Version X.X</Typography>
      </Box>
    </Box>
  );
}
