"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      {navItems.map((item, idx) => (
        <Box key={item.href}>
          <Link href={item.href} passHref>
            <Button fullWidth>{item.label}</Button>
          </Link>
          {idx < navItems.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          mt: "0.1rem",
          background:
            "linear-gradient(to right, var(--theme-color-dark) 0%, var(--theme-color-light) 63%)",
          px: 2,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontStyle: "italic", letterSpacing: "0.15rem" }}
          >
            KsVill Hotel
          </Typography>

          {/* Desktop nav */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Box sx={{ mx: "1.5rem" }}>
              <Link href="/secure/admin/control" passHref>
                <Button
                  variant="contained"
                  sx={{
                    paddingX: "1.5rem",
                    backgroundColor: "white",
                    color: "var(--text-dark)",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "var(--button-bg-light)" },
                  }}
                >
                  Control
                </Button>
              </Link>
            </Box>

            {navItems.map((item, idx) => (
              <Box
                key={item.href}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Link href={item.href} passHref>
                  <Button
                    sx={{
                      width: "6.5rem",
                      color: "white",
                      fontSize: "0.8rem",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>

                {/* Divider only if not the last item */}
                {idx < navItems.length - 1 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      bgcolor: "white",
                      opacity: 0.5,
                      mx: 2,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
}
