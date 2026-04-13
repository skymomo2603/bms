"use client";

import { Box, Divider, Typography } from "@mui/material";

import { SITE_COPYRIGHT, SITE_VERSION } from "@/constants/site";

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
      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.3)",
          mb: 2,
        }}
      />

      <div className="flex justify-between items-center">
        <Typography variant="body2">{SITE_COPYRIGHT}</Typography>
        <Typography variant="body2">{SITE_VERSION}</Typography>
      </div>
    </Box>
  );
}
