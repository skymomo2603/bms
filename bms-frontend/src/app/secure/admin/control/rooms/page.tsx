"use client";

import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import { Box, Button, Grid, Typography } from "@mui/material";
import NextLink from "next/link";

export default function RoomsTab() {
  const navItems = [
    {
      label: "Manage Rooms",
      href: "/secure/admin/rooms/manageroom",
      icon: MeetingRoomOutlinedIcon,
      iconSize: 48,
    },
    {
      label: "Manage Promos",
      href: "/secure/admin/rooms/managepromos",
      icon: LocalOfferOutlinedIcon,
      iconSize: 46,
    },
  ];

  return (
    <>
      <Grid
        container
        sx={{
          py: 4,
          px: 3,
        }}
      >
        {navItems.map((item) => (
          <Grid
            item
            key={item.label}
            sx={{
              width: "8rem",
              mx: 1.8,
              textAlign: "center",
            }}
          >
            <Box
              component={NextLink}
              href={item.href}
              sx={{
                display: "block",
                textDecoration: "none",
                boxShadow: "0px 0px 8px var(--box-shadow)",
                borderRadius: "0.5rem",
                overflow: "hidden",
                textAlign: "center",
                aspectRatio: "9 / 8",
                "&:hover": { bgcolor: "var(--button-bg-blue-light-hover)" },
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  height: "70%",
                  color: "var(--icon-blue-dark)",
                  "& .MuiButton-startIcon": { margin: 0 },
                  "&:hover": { bgcolor: "transparent" },
                }}
              >
                <item.icon sx={{ fontSize: item.iconSize, mt: "0.8rem" }} />
              </Button>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--text-blue-dark)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.03rem",
                  mt: "0.1rem",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
